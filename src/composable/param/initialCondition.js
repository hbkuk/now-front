import { ref } from "vue";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";

/**
 * 초기 검색 조건을 담는 반응성 객체를 생성하는 함수
 *
 * @returns {Ref} 초기 검색 조건을 담는 반응성 객체
 */

export function useInitialCondition() {
    return ref({
        startDate: useGetPastDate(365),
        endDate: useGetCurrentDate(),
        postGroup: null,
        category: null,
        keyword: null,
        pageNo: 1,
        maxNumberOfPosts: 10,
        sort: null,
    });
}
