/**
 * 주어진 날짜와 현재 날짜를 비교하여 새로운 포스트(7일 이내)라면 true, 그렇지 않으면 false를 반환
 *
 * @param {string} date - 비교할 날짜 문자열
 * @returns {boolean} 7일 이내의 포스트이면 true, 그렇지 않으면 false를 반환
 */
export function useIsNewPost(date) {
    const now = new Date();
    const postDate = new Date(date);
    const timeDiff = now.getTime() - postDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff <= 7;
}