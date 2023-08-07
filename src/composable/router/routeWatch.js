import {ref, watch} from "vue";
import router from "@/router/router";

/**
 * 라우터의 변경을 감시하는 훅
 *
 * @returns {Object} - 라우터 상태를 담은 객체
 * @property {string} currentRouteName - 현재 라우터의 이름을 나타내는 변수
 */
export function useRouteWatch() {

    const currentRouteName = ref('');

    /**
     * 현재 라우터의 이름을 감시하고, 변경될 때마다 `currentRouteName` 변수 업데이트
     *
     * @param {Object} updateCurrentRoute - 업데이트된 현재 라우터 객체
     */
    watch(
        () => router.currentRoute.value,
        (updateCurrentRoute) => {
            console.log(updateCurrentRoute.name)
            currentRouteName.value = updateCurrentRoute.name;
        },
        { deep: true } // deep 옵션을 사용하여 중첩된 객체를 감시합니다.
    );

    return {
        currentRouteName
    }

}