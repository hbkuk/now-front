import axios from "axios";
import ErrorType from "@/composable/response/ErrorType";
import router from "@/router/router";
import {store} from "@/store";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";
import {RateLimit} from "@/composable/request/constants/RateLimitConstants";
import {useRateLimitedControl} from "@/composable/request/rateLimitedControl";

/**
 * Axios 인스턴스를 생성
 * @type {import("axios").AxiosInstance}
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK,
    withCredentials: true,
});

export default instance;

const {
    writeRequestCount, increaseWriteRequestCount
} = useRateLimitedControl()

/**
 * 요청을 처리하는 Axios 인터셉터 함수
 */
instance.interceptors.request.use(function (config) {
    if (config.method === HttpMethod.POST || config.method === HttpMethod.PUT || config.method === HttpMethod.DELETE) {
        increaseWriteRequestCount();
        if (writeRequestCount > RateLimit.MAX_WRITE_REQUESTS) {
            router.push({name: 'TooManyRequest'}).then(() => {
                return Promise.reject(new Error('Too many write requests.'));
            })
        }
    }
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
    return response;
}, async function (error) {
    console.log(error);
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
    return Promise.reject(error);
});
