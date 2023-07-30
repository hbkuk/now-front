/**
 * HTTP 요청의 결과 코드를 정의하는 객체
 */
export const ResponseResultType = {
    SUCCESS: "success",
    ERROR: "error",
};

/**
 * HTTP 요청의 결과 코드가 성공인지 확인하는 함수
 * @param {string} type - HTTP 요청 결과 코드
 * @return {boolean} 성공 여부
 */
export function isResponseSuccess(type) {
    return ResponseResultType.SUCCESS === type;
}

export function isResponseError(type) {
    return ResponseResultType.ERROR === type;
}
