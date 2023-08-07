/**
 * 게시글의 최대 개수를 나타내는 배열
 * @type {Array<number>}
 */
export const MAX_NUMBER_OF_POSTS = [10, 20, 30, 40, 50];

/**
 * 게시글 정렬 옵션을 나타내는 객체
 * @type {Object}
 * @property {null} LATEST - 최신순 정렬을 나타내는 상수
 * @property {string} RECOMMENDED - 추천순 정렬을 나타내는 상수
 * @property {string} MOST_VIEWED - 조회순 정렬을 나타내는 상수
 * @property {string} COMMENTED - 댓글순 정렬을 나타내는 상수
 * @property {string} SCRAPED - 스크랩순 정렬을 나타내는 상수
 */
export const SORT = {
    LATEST: null,
    RECOMMENDED: "recommended",
    MOST_VIEWED: "most_viewed",
    COMMENTED: "commented",
    SCRAPED: "scraped",
};

/**
 * 게시글 정렬 옵션을 담은 배열
 * @type {Array<Object>}
 */
export const SORT_OPTIONS = [
    { key: "latest", value: SORT.LATEST, label: "최신순" },
    { key: "recommended", value: SORT.RECOMMENDED, label: "추천순" },
    { key: "most_viewed", value: SORT.MOST_VIEWED, label: "조회순" },
    { key: "commented", value: SORT.COMMENTED, label: "댓글순", disabled: true },
    { key: "scraped", value: SORT.SCRAPED, label: "스크랩순", disabled: true },
];
