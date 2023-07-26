/**
 * 지정된 날짜에서 일정 기간을 뺀 날짜를 계산하는 함수
 *
 * @param {number} period - 뺄 일 수
 * @param {Date} [startDate=new Date()] - 기준 날짜 (기본값: 현재 날짜)
 * @returns {string} "YYYY-MM-DD" 형식의 날짜 문자열
 */
export function useGetPastDate(period, startDate = new Date()) {
    startDate.setDate(startDate.getDate() - period);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}