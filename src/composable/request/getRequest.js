import {useFilterParams} from "@/composable/filterParams";
import http from "./http"

/**
 * GET 요청을 수행하는 컴포저블
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {Record<string, any>} [params=null] - 요청에 사용될 매개변수 객체 (기본값: null)
 * @returns {Promise<AxiosResponse<any>>} - 응답 객체
 */
export function useGetRequest(url, params = null) {
    return http.get(url, {params: useFilterParams(params)})
}
