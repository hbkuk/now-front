import router from "@/router/router";
import { ResponseManager } from "@/composable/response/ResponseManager";

/**
 * HTTP 요청의 응답을 처리
 *
 * @param {object} response - HTTP 요청의 응답 객체
 * @param {number} httpSuccessCode - HTTP 성공 상태 코드
 * @param {string|null} redirectName - 리다이렉션할 경로의 이름(선택적).
 * @param redirectParams 리다이렉트 시 전달할 파라미터
 * @returns {object|null} - 응답 데이터 또는 에러 객체
 */
export async function useResponseHandler(response, httpSuccessCode, redirectName = null, redirectParams = null) {
    const errorCode = response?.response?.data?.errorCode || "";

    if (httpSuccessCode === response.status) { // 전달받은 HTTP 성공 상태 코드와 HTTP 응답의 상태 코드가 일치하는 경우
        if (redirectName) {
            await router.push({ name: redirectName, params : redirectParams });
        }
        return { type: "data", data: response.data };
    }

    if (ResponseManager[errorCode]) { // 에러 코드에 해당하는 응답 관리 객체가 있는 경우
        const { type, name } = ResponseManager[errorCode];
        if (type === "push") {
            await router.push({ name });
        } else if (type === "show") {
            return { type: "error", error: response.response.data };
        }
    }

    await router.push({ name: "NotFound" });  // 기본적으로 NotFound 페이지로 리디렉션
}
