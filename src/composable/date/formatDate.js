/**
 * "YYYY-MM-DDTHH:mm:ss" 형식의 날짜를 "YYYY-MM-DD HH시mm분" 형식으로 변환하는 함수
 *
 * @param {string} dateString - 변환할 날짜 문자열
 * @returns {string} "YYYY-MM-DD HH시mm분" 형식의 날짜 문자열
 */
export function useFormatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}시${minutes}분`;
}
