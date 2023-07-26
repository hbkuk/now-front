/**
 * 현재 날짜를 가져오는 함수
 *
 * @returns {string} "YYYY-MM-DD" 형식의 날짜 문자열
 */
export function useGetCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}