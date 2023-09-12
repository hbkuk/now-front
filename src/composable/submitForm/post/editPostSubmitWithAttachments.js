import {computed, ref, watch} from 'vue';
import {useValidateAttachmentsExtension} from "@/composable/attachment/validateAttachmentsExtension";
import {useValidateAttachmentSize} from "@/composable/attachment/validateAttachmentSize";
import {useValidateAttachmentUploadCount} from "@/composable/attachment/validateAttachmentUploadCount";
import router from "@/router/router";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import {useExtractIdFromLocationHeader} from "@/composable/param/extractIdFromLocationHeader";
import {isImageExtension} from "@/composable/attachment/isImageExtension";
import {useResizeImage} from "@/composable/attachment/resizeImage";

/**
 * 게시글 수정 폼을 관리하는 컴포저블
 *
 * @param {object} attachmentType - AttachmentType 객체 (파일 업로드에 필요한 정보를 가진 객체)
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @param {string} targetRouteName - 수정 성공 후 이동할 라우터 이름
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useEditPostSubmitWithAttachments(attachmentType, formDataName, savePostFunction, targetRouteName) {
    const submitError = ref(null)

    const post = ref({category: null});

    const formData = ref(new FormData());

    const resizedAndUnmodifiedAttachments = ref([]);

    // 삭제할 첨부파일 인덱스를 저장하는 배열
    const selectedDeleteAttachmentIndexes = ref([]);

    const attachmentUploadErrors = ref({
        hasUnsupportedExtensions: false,
        isSizeExceeded: false,
        isMaxUploadCountExceeded: false
    });

    /**
     * 업로드된 파일들의 유효성 검사 결과를 확인하여 에러 여부를 반환하는 함수
     *
     * @param {FileList} files - 업로드된 파일들의 FileList 객체
     * @returns {boolean} 업로드된 파일들의 유효성 검사 결과에 따른 에러 여부 (true: 에러 발생, false: 에러 없음)
     */
    function hasAttachmentUploadErrors(files) {
        attachmentUploadErrors.value.hasUnsupportedExtensions = useValidateAttachmentsExtension(files, attachmentType.allowedExtensions);
        attachmentUploadErrors.value.isSizeExceeded = useValidateAttachmentSize(files, attachmentType.maxUploadSize);
        attachmentUploadErrors.value.isMaxUploadCountExceeded = useValidateAttachmentUploadCount(files, attachmentType.maxUploadCount);

        return (
            attachmentUploadErrors.value.hasUnsupportedExtensions ||
            attachmentUploadErrors.value.isSizeExceeded ||
            attachmentUploadErrors.value.isMaxUploadCountExceeded
        );
    }

    /**
     * 파일 업로드 핸들러 함수
     *
     * @param {Event} event - 파일 업로드 이벤트 객체
     */
    const useHandleAttachment = async (event) => {
        resizedAndUnmodifiedAttachments.value = [];

        for (const file of event.target.files) {
            if (isImageExtension(file.name)) {
                resizedAndUnmodifiedAttachments.value.push(await useResizeImage(file, 800));
            }
            if (!isImageExtension(file.name)) {
                resizedAndUnmodifiedAttachments.value.push(file);
            }
        }

        if (hasAttachmentUploadErrors(resizedAndUnmodifiedAttachments.value)) {
            event.target.value = "";
            resizedAndUnmodifiedAttachments.value = [];
            return;
        }

        formData.value.delete('attachments');
        for (const resizedAndUnmodifiedAttachment of resizedAndUnmodifiedAttachments.value) {
            formData.value.append('attachments', resizedAndUnmodifiedAttachment);
        }
    };

    /**
     * 삭제할 첨부파일 인덱스를 배열에 추가
     *
     * @param {number} attachmentIdx - 삭제할 파일의 인덱스
     */
    function useDeleteAttachment(attachmentIdx) {
        selectedDeleteAttachmentIndexes.value.push(attachmentIdx);
    }

    /**
     * 게시글의 이전 첨부파일 인덱스들을 계산하는 반응성 컴퓨티드 프로퍼티
     *
     * @type {ComputedRef<number[]>} 이전 첨부파일 인덱스들을 담은 ComputedRef 객체
     */
    const notDeletedIndexes = computed(() => {
        return post.value.attachments.map((attachment) => attachment.attachmentIdx)
            .filter((idx) => !selectedDeleteAttachmentIndexes.value.includes(idx))
    });

    /**
     * 첨부파일 인덱스가 삭제된 상태인지 확인하는 함수
     *
     * @param {number} attachmentIdx - 첨부파일 인덱스
     * @returns {boolean} 첨부파일 인덱스가 삭제된 상태인지 여부 (true: 삭제된 상태, false: 삭제되지 않은 상태)
     */
    function isAttachmentIdxDeleted(attachmentIdx) {
        return selectedDeleteAttachmentIndexes.value.indexOf(attachmentIdx) !== -1;
    }

    /**
     * 서버로 전송할 폼 데이터 객체를 반환하는 함수
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData() {
        formData.value.delete('notDeletedIndexes');
        formData.value.append('notDeletedIndexes', notDeletedIndexes.value);

        formData.value.delete(formDataName);
        formData.value.append(formDataName, new Blob([JSON.stringify(post.value)], {type: 'application/json'}));
        return formData.value;
    }

    /**
     * 게시글 작성 폼을 서버에 제출하는 함수
     *
     * @param postIdx 게시글 번호
     * @returns {Promise<void>}
     */
    async function useSubmit(postIdx) {
        try {
            await savePostFunction(postIdx, getSubmitFormData()).then(async (response) => {
                await router.push({
                    name: targetRouteName,
                    params: {postIdx: useExtractIdFromLocationHeader(response.headers.location)}
                })
            })
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit(postIdx));
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                submitError.value = error.response.data.message;
            }
        }
    }

    return {
        post,
        selectedDeleteAttachmentIndexes,
        isAttachmentIdxDeleted,
        formData,
        submitError,
        attachmentUploadErrors,
        hasAttachmentUploadErrors,
        useHandleAttachment,
        useDeleteAttachment,
        useSubmit
    };
}
