/**
 * null 값을 제외한 필터링된 검색 조건 반환
 *
 * @param {Object} parameter - 파라미터 객체
 * @returns {Object} - 필터링된 파라미터 객체
 * @example
 *
 * // 예시 1: 파라미터 객체에서 null 값을 제외하여 필터링
 * const parameter = {
 *   startDate: '2023-01-01',
 *   endDate: null,
 *   categoryIdx: '1',
 *   keyword: null,
 *   pageNo: 1
 * };
 *
 * const filteredParams = filterParams(parameter);
 * filteredParams: { startDate: '2023-01-01', categoryIdx: '1', pageNo: 1 }
 */
export function useFilterParams(parameter) {
    return Object.entries(parameter || {})
        .filter(([key, value]) => value !== null)
        .reduce((params, [key, value]) => {
            params[key] = value;
            return params;
        }, {});
}