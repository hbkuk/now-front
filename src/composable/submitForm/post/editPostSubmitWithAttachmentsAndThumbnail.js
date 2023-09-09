import {computed, ref, watch} from 'vue';
import {useValidateAttachmentsExtension} from "@/composable/attachment/validateAttachmentsExtension";
import {useValidateAttachmentSize} from "@/composable/attachment/validateAttachmentSize";
import {useValidateAttachmentUploadCount} from "@/composable/attachment/validateAttachmentUploadCount";
import router from "@/router/router";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import {EditPhotoOptions} from "@/composable/attachment/constants/EditAttachmentType";
import {useExtractIdFromLocationHeader} from "@/composable/param/extractIdFromLocationHeader";

/**
 * 사진 게시글의 수정 폼을 관리하는 컴포저블
 *
 * @param {object} attachmentType - AttachmentType 객체 (파일 업로드에 필요한 정보를 가진 객체)
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @param {string} targetRouteName - 수정 성공 후 이동할 라우터 이름
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useEditPostSubmitWithAttachmentsAndThumbnail(attachmentType, formDataName, savePostFunction, targetRouteName) {

    // 선택된 편집 옵션
    const selectedEditOption = ref(EditPhotoOptions.EDIT_EXISTING.code);

    // 편집 옵션 목록
    const editOptions = ref([
        { text: EditPhotoOptions.EDIT_EXISTING.text, value: EditPhotoOptions.EDIT_EXISTING.code },
        { text: EditPhotoOptions.ADD_NEW.text, value: EditPhotoOptions.ADD_NEW.code },
    ])

    // 게시글 데이터 객체
    const post = ref({category: null});

    // 폼 데이터 객체
    const formData = ref(new FormData());

    // 게시글 수정 제출 시 발생한 에러
    const submitError = ref(null)

    //  파일 업로드 관련 에러 상태
    const attachmentUploadErrors = ref({
        hasUnsupportedExtensions: false,
        isSizeExceeded: false,
        isMaxUploadCountExceeded: false
    });

    // 기존 이미지에서 선택된 대표 이미지의 attachmentIdx
    const selectedThumbnailAttachmentIdx = ref(0);

    // 삭제할 첨부파일 인덱스를 저장하는 배열
    const selectedDeleteAttachmentIndexes = ref([]);

    // 대표 이미지 파일을 담는 반응성 객체
    const selectedFile = ref();

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
     * 게시글의 이전 첨부파일들을 계산하는 반응성 컴퓨티드 프로퍼티
     *
     * @type {ComputedRef<object[]>} 이전 첨부파일들을 담은 ComputedRef 객체
     */
    const notDeletedAttachments = computed(() => {
        return post.value.attachments
                        .filter((attachment) => !isAttachmentIdxDeleted(attachment.attachmentIdx));
    });

    /**
     * 서버로 전송할 폼 데이터 객체를 반환하는 함수
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData() {
        if( selectedEditOption.value === EditPhotoOptions.EDIT_EXISTING.code ) {

            formData.value.delete('notDeletedIndexes');
            formData.value.append('notDeletedIndexes', notDeletedIndexes.value);

            formData.value.delete('thumbnailAttachmentIdx');
            formData.value.append('thumbnailAttachmentIdx', selectedThumbnailAttachmentIdx.value || 0);
        }
        formData.value.delete('updateOption');
        formData.value.append('updateOption'
                        , new Blob([JSON.stringify(selectedEditOption.value)], {type: 'application/json'}));

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

    /**
     * 대표 이미지 변경 처리 함수
     *
     * @param {Event} event - 파일 선택 이벤트
     */
    const useHandleThumbnail = (event) => {
        if (hasAttachmentUploadErrors(event.target.files)) {
            selectedFile.value = null;
            event.target.value = "";
            return;
        }

        formData.value.delete('thumbnailAttachmentIdx');

        // 사진을 하나만 선택할 수 있도록 기존의 thumbnail을 모두 삭제
        formData.value.delete('thumbnail');

        // 새로 선택한 파일을 formData에 추가
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            formData.value.append('thumbnail', file);

            // 파일 미리보기 설정
            const reader = new FileReader();
            reader.onload = () => {
                selectedFile.value = {
                    file: file,
                    preview: reader.result
                };
            };
            reader.readAsDataURL(file);
        } else {
            selectedFile.value = null;
        }
    };

    // 사용자가 선택한 대표 이미지의 변경을 감시하고, selectedThumbnailAttachmentIdx를 업데이트하는 함수
    watch(
        () => post.value?.thumbnailAttachmentIdx, // post.value 객체를 반환하는 함수를 사용합니다.
        (updateAttachmentIdx) => {
            if(updateAttachmentIdx === null || updateAttachmentIdx === undefined) {
                post.value.thumbnailAttachmentIdx = 0;
            }
            selectedThumbnailAttachmentIdx.value = updateAttachmentIdx;
        },
        { deep: true } // deep 옵션을 사용하여 중첩된 객체를 감시합니다.
    );

    // 사용자가 선택한 삭제할 첨부파일 인덱스를 감시하고, 삭제한 인덱스가 대표 이미지 인덱스라면 0으로 초기화
    watch(
        () => selectedDeleteAttachmentIndexes.value,
        (updateDeleteAttachmentIdx) => {
            if(isAttachmentIdxDeleted(post.value.thumbnailAttachmentIdx)) {
                post.value.thumbnailAttachmentIdx = 0;
            }
        },
        { deep: true } // deep 옵션을 사용하여 중첩된 객체를 감시합니다.
    );

    return {
        isAttachmentIdxDeleted,
        notDeletedAttachments,
        selectedDeleteAttachmentIndexes,
        selectedFile,
        selectedEditOption,
        editOptions,
        post,
        formData,
        submitError,
        attachmentUploadErrors,
        hasAttachmentUploadErrors,
        useHandleAttachment,
        useDeleteAttachment,
        useHandleThumbnail,
        useSubmit
    };
}
