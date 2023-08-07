/**
 * 객체를 쿼리스트링으로 변환하는 함수
 *
 * @param {Record<string, any>} obj - 변환할 객체
 * @returns {string} - 변환된 쿼리스트링
 */
export function useObjectToQueryString(obj) {
    const queryParams = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined) {
            queryParams.append(key, obj[key]);
        }
    }
    return queryParams.toString();
}