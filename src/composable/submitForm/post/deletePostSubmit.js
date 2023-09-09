import {ref} from 'vue';
import router from "@/router/router";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";

/**
 * 게시물 삭제 요청을 처리하는 컴포지션 함수
 *
 * @param {string} targetRouteName - 삭제 성공 후 이동할 라우터 이름
 * @param {Function} deletePostFunction - 게시물 삭제 함수
 * @returns {{useSubmit: ((function(string): Promise<void>)|*), deleteSubmitError: null}}
 */
export function useDeletePostSubmit(targetRouteName, deletePostFunction) {
    const deleteSubmitError = ref(null);

    /**
     * 게시물 삭제를 요청하는 함수
     *
     * @param {string} postIdx - 삭제할 게시물 번호
     * @returns {Promise<void>}
     */
    async function useSubmit(postIdx) {
        try {
            await deletePostFunction(postIdx).then(() => {router.push({name: targetRouteName })});
        } catch (error) {
            console.log(error)
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit(postIdx));
            }
            if (error.response?.data?.errorCode === ErrorType.CAN_NOT_DELETE_OTHER_MEMBER_POST) {
                deleteSubmitError.value = error.response.data;
            }
            if (error.response?.data?.errorCode === ErrorType.CAN_NOT_DELETE_POST_WITH_OTHER_MEMBER_COMMENTS) {
                deleteSubmitError.value = error.response.data;
            }
            return Promise.reject(error);
        }
    }

    return {
        deleteSubmitError,
        useSubmit
    };
}
