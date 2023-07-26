/**
 * 주어진 날짜와 현재 날짜와의 차이를 텍스트로 반환
 *
 * @param {string} dateString - 비교할 날짜 문자열
 * @returns {string} 시간 차이에 따른 텍스트
 */
export function useGetTimeDifference(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const timeDiff = now.getTime() - postDate.getTime();
    const minuteDiff = timeDiff / (1000 * 60);
    const hourDiff = timeDiff / (1000 * 60 * 60);
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
    const monthDiff = timeDiff / (1000 * 60 * 60 * 24 * 30);
    const yearDiff = timeDiff / (1000 * 60 * 60 * 24 * 365);

    if (minuteDiff < 1) {
        return '방금 전';
    } else if (minuteDiff < 60) {
        return `${Math.floor(minuteDiff)}분 전`;
    } else if (hourDiff < 24) {
        return `${Math.floor(hourDiff)}시간 전`;
    } else if (dayDiff < 30) {
        return `${Math.floor(dayDiff)}일 전`;
    } else if (monthDiff < 12) {
        return `${Math.floor(monthDiff)}달 전`;
    } else {
        return `${Math.floor(yearDiff)}년 전`;
    }
}