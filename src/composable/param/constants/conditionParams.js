/**
 * 게시글 검색 조건에 사용되는 파라미터들의 매핑 객체
 *
 * @type {Object}
 * @property {string} startDate - 시작 날짜를 나타내는 파라미터 이름
 * @property {string} endDate - 끝 날짜를 나타내는 파라미터 이름
 * @property {string} postGroup - 게시글 그룹을 나타내는 파라미터 이름
 * @property {string} category - 카테고리를 나타내는 파라미터 이름
 * @property {string} keyword - 검색 키워드를 나타내는 파라미터 이름
 * @property {string} pageNo - 페이지 번호를 나타내는 파라미터 이름
 * @property {string} maxNumberOfPosts - 한 페이지에 표시할 게시글 최대 개수를 나타내는 파라미터 이름
 * @property {string} sort - 페이지 정렬 조건을 나타내는 파라미터 이름
 */
export const CONDITION_PARAMS = {
    startDate: 'sd',
    endDate: 'ed',
    postGroup: 'pos',
    category: 'cat',
    keyword: 'q',
    pageNo: 'p',
    maxNumberOfPosts: 'max',
    sort: 'srt'
};

/**
 * 주어진 객체의 키를 게시글 검색 조건에 사용되는 파라미터의 이름으로 변환하여 반환
 *
 * @param {Object} obj - 변환하고자 하는 객체
 * @returns {Object} 변환된 파라미터를 가진 객체
 */
export function useConvertKeysToConditionParams(obj) {
    const convertedObj = {};
    for (const key in obj) {
        if (CONDITION_PARAMS[key]) {
            convertedObj[CONDITION_PARAMS[key]] = obj[key];
        }
    }
    return convertedObj;
}