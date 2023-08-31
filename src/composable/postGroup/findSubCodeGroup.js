/**
 * 지정된 카테고리 코드에 해당하는 하위 코드 그룹을 찾아 반환
 *
 * @param {Array} categories - 카테고리 배열
 * @param {string} categoryCode - 찾을 카테고리 코드
 * @returns {Array} 하위 코드 그룹 배열 (찾지 못할 경우 빈 배열)
 */
export function useFindSubCodeGroup(categories, categoryCode) {
    const category = categories.find(item => item.code === categoryCode);
    return category ? category.subCodeGroup : [];
}

