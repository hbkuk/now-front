import {ref} from "vue";

export function useDeleteBoardModal() {
    const modalShow = ref(false)
    const password = ref('')

    /**
     * 비밀번호 초기화 함수
     */
    function resetPassword() {
        password.value = ''
    }

    return {
        modalShow,
        password,
        resetPassword,
    }
}