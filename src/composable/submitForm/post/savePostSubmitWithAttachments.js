import {ref} from 'vue';
import {useValidateAttachmentsExtension} from "@/composable/attachment/validateAttachmentsExtension";
import {useValidateAttachmentSize} from "@/composable/attachment/validateAttachmentSize";
import {useValidateAttachmentUploadCount} from "@/composable/attachment/validateAttachmentUploadCount";
import router from "@/router/router";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import {useExtractIdFromLocationHeader} from "@/composable/param/extractIdFromLocationHeader";
import {useResizeImage} from "@/composable/attachment/resizeImage";
import {AttachmentType} from "@/composable/attachment/constants/AttachmentType";
import {isImageExtension} from "@/composable/attachment/isImageExtension";

/**
 * 게시글 작성 폼을 관리하는 컴포저블
 *
 * @param {object} attachmentType - AttachmentType 객체 (파일 업로드에 필요한 정보를 가진 객체)
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @param {string} targetRouteName - 저장 성공 후 이동할 라우터 이름
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useSavePostSubmitWithAttachments(attachmentType, formDataName, savePostFunction, targetRouteName) {
    const submitError = ref(null);

    const post = ref({category: null});

    const formData = ref(new FormData());

    const selectedFile = ref(null);

    const resizedAndUnmodifiedThumbnail = ref([]);

    const resizedAndUnmodifiedAttachments = ref([]);

    const attachmentUploadErrors = ref({
        hasUnsupportedExtensions: false,
        isSizeExceeded: false,
        isMaxUploadCountExceeded: false
    });

    /**
     * 업로드된 파일들의 유효성 검사 결과를 확인하여 에러 여부를 반환하는 함수
     * @param files files - 업로드된 파일들의 FileList 객체
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
     * 대표 이미지 변경 처리 함수
     *
     * @param {Event} event - 파일 선택 이벤트
     */
    const useHandleThumbnail = async (event) => {
        resizedAndUnmodifiedThumbnail.value = [];

        for (const file of event.target.files) {
            if (isImageExtension(file.name)) {
                resizedAndUnmodifiedThumbnail.value.push(await useResizeImage(file, 800));
            }
            if (!isImageExtension(file.name)) {
                resizedAndUnmodifiedThumbnail.value.push(file);
            }
        }

        if (hasAttachmentUploadErrors(resizedAndUnmodifiedThumbnail.value)) {
            selectedFile.value = null;
            event.target.value = "";
            return;
        }

        formData.value.delete('thumbnail');
        for (const resizedAndUnmodifiedFile of resizedAndUnmodifiedThumbnail.value) {
            formData.value.append('thumbnail', resizedAndUnmodifiedFile)
        }

        if (resizedAndUnmodifiedThumbnail.value && resizedAndUnmodifiedThumbnail.value.length > 0) {
            const file = resizedAndUnmodifiedThumbnail.value[0];
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
     * 서버로 전송할 폼 데이터 객체를 반환하는 함수
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData() {
        formData.value.delete(formDataName);
        formData.value.append(formDataName, new Blob([JSON.stringify(post.value)], {type: 'application/json'}));
        return formData.value;
    }

    /**
     * 게시글 작성 폼을 서버에 제출하는 함수
     */
    async function useSubmit() {
        try {
            await savePostFunction(getSubmitFormData()).then(async (response) => {
                await router.push({
                    name: targetRouteName,
                    params: {postIdx: useExtractIdFromLocationHeader(response.headers.location)}
                })
            })
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit());
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                submitError.value = error.response.data.message;
            }
            if (error.response?.data?.errorCode === ErrorType.INVALID_SECRET) {
                submitError.value = {password: "비밀번호를 필수로 설정하셔야 합니다."};
            }
        }
    }

    return {
        post,
        formData,
        submitError,
        selectedFile,
        attachmentUploadErrors,
        hasAttachmentUploadErrors,
        useHandleThumbnail,
        useHandleAttachment,
        useSubmit
    };
}
