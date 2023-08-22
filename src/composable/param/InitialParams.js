import {useFilterParams} from "@/composable/param/filterParams";

/**
 * 초기 검색 조건을 가져오는 컴포저블
 *
 *  1. 현재 라우터의 파라미터
 *          /boards?keyword=title&pageNo=1
 *
 * @returns {Object|null} - 초기 검색 조건 객체 또는 null
 * @param params - 파리미터
 * @param {Object} sessionStorage - sessionStorage 객체
 */
export function useInitialParams(params, sessionStorage) {
    const currentRouteParams = useFilterParams(params); // 현재 라우터에서 파라미터 추출
    if (currentRouteParams && Object.keys(currentRouteParams).length !== 0) {
        return currentRouteParams;
    }

    const sessionParams = useFilterParams(JSON.parse(sessionStorage.getItem('condition'))); // sessionStorage에서 파라미터 추출
    if (sessionParams && Object.keys(sessionParams).length !== 0) {
        return sessionParams;
    }
    return null; // 초기 검색 조건이 없을 경우 null 반환
}