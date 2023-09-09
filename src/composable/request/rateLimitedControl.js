import {ref} from "vue";
import {RateLimit} from "@/composable/request/constants/RateLimitConstants";

/**
 * 쓰기 요청을 제한하는 반응성 객체를 다루는 컴포저블 함수
 */
export function useRateLimitedControl() {
    const writeRequestCount = ref(0);

    /**
     * 쓰기 요청 카운트를 0으로 재설정
     * @function
     */
    function resetWriteRequestCount() {
        writeRequestCount.value = 0;
    }

    /**
     * 쓰기 요청 카운트를 1 증가
     * @function
     */
    function increaseWriteRequestCount() {
        writeRequestCount.value++;
    }

    // 지정된 시간 간격에 따라 쓰기 요청 카운트를 재설정하기 위해 인터벌 설정
    setInterval(resetWriteRequestCount, RateLimit.TIME_INTERVAL);

    return {
        writeRequestCount,
        increaseWriteRequestCount,
        resetWriteRequestCount,
    };
}