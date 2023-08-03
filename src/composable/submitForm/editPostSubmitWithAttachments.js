import {computed, ref, watch} from 'vue';
import {useValidateAttachmentsExtension} from "@/composable/attachment/validateAttachmentsExtension";
import {useValidateAttachmentSize} from "@/composable/attachment/validateAttachmentSize";
import {useValidateAttachmentUploadCount} from "@/composable/attachment/validateAttachmentUploadCount";
import router from "@/router/router";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";

/**
 * 게시글 수정 폼을 관리하는 컴포저블
 *
 * @param {object} attachmentType - AttachmentType 객체 (파일 업로드에 필요한 정보를 가진 객체)
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useEditPostSubmitWithAttachments(attachmentType, formDataName, savePostFunction) {
    const submitError = ref(null)

    const post = ref({category: null});

    const formData = ref(new FormData());

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
    const useHandleAttachment = (event) => {
        if (hasAttachmentUploadErrors(event.target.files)) {
            event.target.value = "";
            return;
        }

        formData.value.delete('attachments');
        for (const file of event.target.files) {
            formData.value.append('attachments', file)
        }
    };

    /**
     * 파일 인덱스에 해당하는 파일을 삭제
     *
     * @param {number} attachmentIdx - 삭제할 파일의 인덱스
     */
    function useDeleteAttachment(attachmentIdx) {
        post.value.attachments = post.value.attachments.filter((attachment) => attachment.attachmentIdx !== attachmentIdx)
    }

    /**
     * 파일의 인덱스를 계산된 속성으로 반환
     *
     * @returns {number[]} 파일의 인덱스 배열
     */
    const attachmentIndexes = computed(() => {
        return post.value.attachments.map((attachment) => attachment.attachmentIdx)
    })

    /**
     * 서버로 전송할 폼 데이터 객체를 반환하는 함수
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData() {
        formData.value.delete('attachmentIndexes');
        formData.value.append('attachmentIndexes', attachmentIndexes.value);

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
            const response = await savePostFunction(postIdx, getSubmitFormData());
            await router.push(response.headers.location.replace("/api", ""));
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit());
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                submitError.value = error.response.data.message;
            }
            return Promise.reject(error)
        }
    }

    return {
        post,
        formData,
        submitError,
        attachmentUploadErrors,
        hasAttachmentUploadErrors,
        useHandleAttachment,
        useDeleteAttachment,
        useSubmit
    };
}
