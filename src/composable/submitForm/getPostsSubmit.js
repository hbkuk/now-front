import {ref} from 'vue';
import {useInitialCondition} from "@/composable/param/initialCondition";
import {useUpdateUrl} from "@/composable/param/updateUrl";
import {useConvertKeysToConditionParams, useConvertParamsToKeys} from "@/composable/param/constants/conditionParams";
import {useInitialParams} from "@/composable/param/InitialParams";
import {useUpdateSessionStorage} from "@/composable/param/useUpdateSessionStorage";

/**
 * 게시글 목록을 조회하고 페이지 정보를 관리하는 컴포지션 함수
 *
 * @param {object} query - 라우터 쿼리 파라미터
 * @param {string} code - 초기 검색 조건 코드
 * @param {function} getPostsFunction - 게시글 목록 조회 함수
 * @param {function} updateUrl - URL 업데이트 함수
 * }}
 */
export function useGetPostsSubmit(query, code, getPostsFunction, updateUrl) {
    const fetchPostsData = ref(null);

    const initialCondition = useInitialCondition(code);

    /** 현재 라우터의 파라미터와 확인 후 initialCondition 속성 덮어쓰기 */
    Object.assign(initialCondition.value, useInitialParams(useConvertParamsToKeys(query), sessionStorage));

    /**
     * 조건 변경 함수
     *
     * @param {number} updateCondition - 변경된 조건 객체
     */
    function updateCondition(updateCondition) {
        initialCondition.value = updateCondition
        return useSubmit()
    }

    /**
     * 페이지 변경 함수
     *
     * @param {number} pageNo - 변경된 페이지 번호
     */
    function changePage(pageNo) {
        initialCondition.value.pageNo = pageNo
        return useSubmit()
    }

    /**
     * 게시글 목록을 가져오기 위한 서버에 요청하는 함수
     */
    async function useSubmit() {
        return getPostsFunction(initialCondition.value).then(response => {
            fetchPostsData.value = response.data
            useUpdateUrl(updateUrl, useConvertKeysToConditionParams(initialCondition.value));
            useUpdateSessionStorage('condition', initialCondition.value);
        }).catch(error => {
            initialCondition.value = useInitialCondition(code);
        })
    }

    return {
        fetchPostsData,
        initialCondition,
        updateCondition,
        changePage,
        useSubmit
    };
}
