/**
 * 반응 유형을 나타내는 상수 객체
 *
 * @typedef {object} Reaction
 * @property {string} NOTTING - 반응 없음 상태
 * @property {string} LIKE - 좋아요 상태
 * @property {string} UNLIKE - 싫어요 상태 취소
 * @property {string} DISLIKE - 싫어요 상태
 * @property {string} UNDISLIKE - 좋아요 상태 취소
 */

/**
 * 반응 유형을 정의한 상수 객체
 * @type {Reaction}
 */
export const Reaction = {
    NOTTING: "NOTTING",
    LIKE: "LIKE",
    UNLIKE: "UNLIKE",
    DISLIKE: "DISLIKE",
    UNDISLIKE: "UNDISLIKE"
};
