import {useFilterParams} from "@/composable/filterParams";

/**
 * Session Storage를 업데이트하는 함수
 *
 * @param attributeName 업데이트할 속성명
 * @param attributeObject 업데이트할 객체
 */
export function useUpdateSessionStorage(attributeName, attributeObject) {
    sessionStorage.setItem(attributeName, JSON.stringify(useFilterParams(attributeObject)))
}