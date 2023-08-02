import {ref} from 'vue';
import router from "@/router/router";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";

/**
 * 게시글 작성 폼을 관리하는 컴포저블
 *
 * @param {string} formDataName - 폼 데이터의 이름
 * @param {Function} savePostFunction - 게시글을 저장하는 서비스 메서드
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useSavePostSubmit(formDataName, savePostFunction) {
    const submitError = ref(null)

    const post = ref({category: null});

    /**
     * 게시글 작성 폼을 서버에 제출하는 함수
     */
    async function useSubmit() {
        try {
            const response = await savePostFunction(new Blob([JSON.stringify(post.value)], {type: 'application/json'}));
            await router.push(response.headers.location.replace("/api", ""));
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit());
                return;
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                submitError.value = error.response.data.message;
                return;
            }
            return Promise.reject(error);
        }
    }

    return {
        post,
        submitError,
        useSubmit
    };
}
