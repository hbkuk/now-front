import axios from "axios";
import ErrorType from "@/composable/response/constants/ErrorType";
import router from "@/router/router";
import {store} from "@/store";
import {useRateLimitedControl} from "@/composable/request/rateLimitedControl";
import {RateLimit} from "@/composable/request/constants/RateLimitConstants";
import {ResponseHeader} from "@/composable/response/constants/Headers";

/**
 * Axios 인스턴스를 생성
 * @type {import("axios").AxiosInstance}
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK_URL,
    withCredentials: true,
});

export default instance;

const {
    writeRequestCount,
    increaseWriteRequestCount,
    resetWriteRequestCount
} = useRateLimitedControl()

let previousRequestUrl = null;

/**
 * 요청을 처리하는 Axios 인터셉터 함수
 */
instance.interceptors.request.use(function (config) {

    increaseWriteRequestCount();
    if (writeRequestCount.value > RateLimit.MAX_WRITE_REQUESTS) {
        store.updateIsDuplicateRequesting(true); // 중복 요청이라고 표시
        resetWriteRequestCount();
    }

    if (store.getIsCurrentRequesting()) {
        store.updateIsDuplicateRequesting(true); // 중복 요청이라고 표시
    }

    if (previousRequestUrl === config.url) {
        store.updateIsDuplicateRequesting(true); // 중복 요청이라고 표시
        return Promise.reject(new Error("Request is already in progress")); // 이미 요청 중인 경우 요청 막기
    }
    previousRequestUrl = config.url; // 이전 요청의 URL 저장

    store.updateIsCurrentRequesting(true);

    return config;
}, function (error) {
    return Promise.reject(error);
});


/**
 * 응답을 처리하는 Axios 인터셉터 함수
 * @param {import("axios").AxiosResponse} response - 성공적인 응답 객체
 * @returns {import("axios").AxiosResponse} - 처리된 응답 객체
 * @throws {import("axios").AxiosError} - 응답이 실패한 경우 예외를 던짐
 */
instance.interceptors.response.use(function (response) {
    store.updateIsCurrentRequesting(false);
    return response;
}, async function (error) {
    store.updateIsCurrentRequesting(false);

    const errorCode = error?.response?.data?.errorCode;
    // 전역 에러 핸들링
    if (errorCode === ErrorType.NOT_FOUND_POST) {
        await router.push({name: "NotFound"});
    }
    if (errorCode === ErrorType.NOT_AUTHENTICATED) {
        store.resetMember();
        await router.push({name: "SignIn"});
    }
    if (errorCode === ErrorType.INVALID_TOKEN) {
        store.resetMember();
        await router.push({name: "SignIn"});
    }
    if (errorCode === ErrorType.EXPIRED_REFRESH_TOKEN) {
        store.resetMember();
        await router.push({name: "SignIn"});
    }
    if (errorCode === ErrorType.CAN_NOT_UPDATE_OTHER_MEMBER_POST) {
        await router.push({name: "Forbidden"});
    }
    if (errorCode === ErrorType.FORBIDDEN) {
        await router.push({name: "Forbidden"});
    }
    if (errorCode === ErrorType.REQUEST_EXCEPTION) {
        await router.push({name: "RequestError"});
    }
    if (errorCode === ErrorType.LOGGED_OUT_TOKEN) {
        store.resetMember();
    }
    if (errorCode === ErrorType.NOT_FOUND_TOKEN) {
        store.resetMember();
    }
    if (errorCode === ErrorType.TOO_MANY_REQUESTS) {
        store.updateIsCurrentRequesting(true);

        const retryAfterHeaderValue = error.response.headers.get(ResponseHeader.X_RATELIMIT_RETRY_AFTER);
        if (retryAfterHeaderValue) {
            setTimeout(() => {
                store.updateIsCurrentRequesting(false);
            }, Math.ceil(parseFloat(retryAfterHeaderValue)));
        }
    }
    return Promise.reject(error);
});
