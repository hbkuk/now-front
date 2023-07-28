import { computed } from 'vue';

/**
 * store에서 특정 categoryCode에 해당하는 subCodeGroup을 찾아주는 컴포저블
 *
 * @param {Array} categories - 카테고리들이 담긴 배열
 * @param {string} categoryCode - 찾고자 하는 카테고리의 코드
 * @returns {import("vue").ComputedRef} - 특정 카테고리의 subCodeGroup을 담는 computed 속성
 */
export function useFindSubCodeGroup(categories, categoryCode) {
    const subCodeGroup = computed(() => {
        const category = categories.find(item => item.code === categoryCode);
        return category ? category.subCodeGroup : [];
    });

    return subCodeGroup;
}

