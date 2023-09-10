import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";

/**
 * 게시글을 조회하고 페이지 정보를 관리하는 컴포지션 함수
 * @param {object} targetObject - 저장할 반응성 객체
 * @param {function} getEditPostFunction - 수정 게시글 조회 함수
 */
export function useGetEditPostSubmit(targetObject, getEditPostFunction) {

    /**
     * 게시글 목록을 가져오기 위한 서버에 요청하는 함수
     */
    async function useSubmit(postIdx) {
        try {
            const response = await getEditPostFunction(postIdx);
            targetObject.value = response?.data
        } catch (error) {
            console.log(error);
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit(postIdx));
            }
        }
    }

    return {
        useSubmit
    };
}
