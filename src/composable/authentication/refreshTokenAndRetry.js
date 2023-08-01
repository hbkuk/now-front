import AuthenticationService from "@/service/AuthenticationService";
import {store} from "@/store";
import router from "@/router/router";

/**
 * 토큰 재발급 후 다시 요청하는 함수
 *
 * 이 함수는 토큰 갱신을 시도하고, 갱신이 성공하면 콜백 함수를 호출
 * 토큰 갱신에 실패하거나, 갱신 후에 콜백 함수 실행 중에 에러가 발생하면
 * 사용자를 로그인 페이지로 이동시키고 에러를 출력
 *
 * @param {Function} callback - 토큰 갱신 후에 실행할 콜백 함수
 * @returns {Promise<void>} - 토큰 갱신 및 콜백 실행 결과를 처리하는 Promise 객체
 * @throws {Error} - 토큰 갱신 실패 또는 콜백 실행 중에 에러가 발생한 경우 에러 객체를 던집니다.
 */
export async function useRefreshTokenAndRetry(callback) {
    try {
        await AuthenticationService.refresh();
        await callback();
    } catch (error) {
        store.resetMember();
        await router.push({name: "SignIn"});
        console.log(error);
        throw error;
    }
}
