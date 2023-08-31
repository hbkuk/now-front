/**
 * Location 헤더에서 마지막 슬래시 뒤에 있는 숫자를 추출
 *
 * @param locationHeader Location 헤더 값 ("/api/communities/45"와 같은 형식)
 * @returns {*} 추출한 숫자
 */
export function useExtractIdFromLocationHeader(locationHeader) {
    return locationHeader.slice(locationHeader.lastIndexOf('/') + 1);
}
