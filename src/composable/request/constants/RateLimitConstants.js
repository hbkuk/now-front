/**
 * 쓰기 요청 제한에 사용되는 객체
 * @type {RateLimit}
 */
export const RateLimit = {
    /**
     * 지정된 시간 간격 내 허용되는 최대 쓰기 요청 수
     * @type {number}
     */
    MAX_WRITE_REQUESTS: 20,

    /**
     * 요청 제한 시간 간격
     * @type {number}
     */
    TIME_INTERVAL: 60 * 3000,
};
