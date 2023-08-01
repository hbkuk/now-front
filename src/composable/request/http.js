import axios from "axios";
import ErrorType from "@/composable/response/ErrorType";
import router from "@/router/router";
import { store } from "@/store";

/**
 * Axios 인스턴스를 생성
 * @type {import("axios").AxiosInstance}
 */
const instance = axios.create({
});

export default instance;

/**
 * 응답을 처리하는 Axios 인터셉터 함수
 * @param {import("axios").AxiosResponse} response - 성공적인 응답 객체
 * @returns {import("axios").AxiosResponse} - 처리된 응답 객체
 * @throws {import("axios").AxiosError} - 응답이 실패한 경우 예외를 던짐
 */
instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    console.log(error);
    const errorCode = error?.response?.data?.errorCode;

    // 전역 에러 핸들링
    if (errorCode === ErrorType.NOT_FOUND_POST) {
        await router.push({ name: "NotFound" });
    }
    if (errorCode === ErrorType.NOT_AUTHENTICATED) {
        await router.push({ name: "SignIn" });
    }
    if (errorCode === ErrorType.INVALID_TOKEN) {
        store.resetMember();
        await router.push({ name: "SignIn" });
    }
    if (errorCode === ErrorType.EXPIRED_REFRESH_TOKEN) {
        store.resetMember();
        await router.push({ name: "SignIn" });
    }
    if (errorCode === ErrorType.CAN_NOT_UPDATE_OTHER_MEMBER_POST) {
        await router.push({ name: "Forbidden" });
    }
    if (errorCode === ErrorType.FORBIDDEN) {
        await router.push({ name: "Forbidden" });
    }
    if (errorCode === ErrorType.LOGGED_OUT_TOKEN) {
        store.resetMember();
        await router.push({ name: "SignIn" });
    }
    return Promise.reject(error);
});
