import router from "@/router/router";
import {store} from "@/store";

/**
 * 로그인 모달에서 확인 버튼을 처리하는 함수
 *
 * @param {Event} bvModalEvent - 모달 이벤트
 */
export function useHandleSignInOk(bvModalEvent) {
    /**
     * @typedef {object} BVModalEvent
     * @property {Function} preventDefault - 기본 동작을 중단시키는 함수
     */

    /**
     * @type {BVModalEvent}
     */
    bvModalEvent.preventDefault();

    // 'SignIn' 페이지로 이동 후 모달 닫기
    router.push({ name: 'SignIn' }).then(() => {
        store.closeSignInModal();
    });
}
