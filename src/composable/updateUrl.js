import {useObjectToQueryString} from "@/composable/objectToQueryString";
import {useFilterParams} from "@/composable/filterParams";

/**
 * URL을 업데이트하는 함수
 *
 * @param url 업데이트할 URL
 * @param object 쿼리스트링 생성에 사용할 객체
 */
export function useUpdateUrl(url, object) {
    window.history.replaceState(history.state, "", `${url}?${useObjectToQueryString(useFilterParams(object))}`)
}