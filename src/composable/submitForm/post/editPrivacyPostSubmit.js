import {computed, ref, watch, watchEffect} from 'vue';
import {useValidateAttachmentsExtension} from "@/composable/attachment/validateAttachmentsExtension";
import {useValidateAttachmentSize} from "@/composable/attachment/validateAttachmentSize";
import {useValidateAttachmentUploadCount} from "@/composable/attachment/validateAttachmentUploadCount";
import router from "@/router/router";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import {useExtractIdFromLocationHeader} from "@/composable/param/extractIdFromLocationHeader";
import {PrivacyUpdateOptions} from "@/composable/privacy/PrivacyUpdateOptions";

/**
 * 게시글 수정 폼을 관리하는 컴포저블
 *
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @param {string} targetRouteName - 수정 성공 후 이동할 라우터 이름
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useEditPrivacyPostSubmit(formDataName, savePostFunction, targetRouteName) {
    const submitError = ref(null)

    const post = ref({category: null});

    const isPasswordChanging  = ref(false);

    function handlePasswordSetting() {
        isPasswordChanging.value = !isPasswordChanging.value;
    }

    const formData = ref(new FormData());

    /**
     * 서버로 전송할 폼 데이터 객체를 반환하는 함수
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData(existSecret) {
        formData.value.delete("privacyUpdateOption");
        if(!post.value.secret) {
            formData.value.append('privacyUpdateOption'
                , new Blob([JSON.stringify(PrivacyUpdateOptions.TO_PUBLIC.code)], {type: 'application/json'}));
        }

        if(post.value.secret) {
            if(existSecret) {
                if(isPasswordChanging.value) {
                    formData.value.append('privacyUpdateOption'
                        , new Blob([JSON.stringify(PrivacyUpdateOptions.CHANGE_PASSWORD.code)], {type: 'application/json'}));
                }
                if(!isPasswordChanging.value) {
                    formData.value.append('privacyUpdateOption'
                        , new Blob([JSON.stringify(PrivacyUpdateOptions.KEEP_PASSWORD.code)], {type: 'application/json'}));
                }

            }
            if(!existSecret) {
                formData.value.append('privacyUpdateOption'
                    , new Blob([JSON.stringify(PrivacyUpdateOptions.TO_PRIVATE.code)], {type: 'application/json'}));
            }
        }

        formData.value.delete(formDataName);
        formData.value.append(formDataName, new Blob([JSON.stringify(post.value)], {type: 'application/json'}));
        return formData.value;
    }

    /**
     * 게시글 작성 폼을 서버에 제출하는 함수
     *
     * @param postIdx 게시글 번호
     * @param existSecret
     * @returns {Promise<void>}
     */
    async function useSubmit(postIdx, existSecret) {
        try {
            await savePostFunction(postIdx, getSubmitFormData(existSecret)).then(async (response) => {
                await router.push({
                    name: targetRouteName,
                    params: {postIdx: useExtractIdFromLocationHeader(response.headers.location)}
                })
            })
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit(postIdx, existSecret));
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
        isPasswordChanging,
        handlePasswordSetting,
        formData,
        submitError,
        useSubmit
    };
}
