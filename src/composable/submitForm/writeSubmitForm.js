import {ref} from 'vue'

/**
 * 게시글 작성 폼을 관리하는 컴포저블
 *
 * @param {object} modifyViewData - 작성할 게시글 데이터
 * @returns {object} 게시글 작성 폼 관련 함수와 상태를 포함한 객체
 */
export function useWriteSubmitForm() {
    const board = ref({
        categoryIdx: 10,
        title: "최초 제목1",
        writer: "테스터1",
        content: "최초 내용1",
        password: "qudrnr132!"
    })
    //const board = ref({categoryIdx: null}) // 게시글 데이터
    const formData = ref(new FormData()); // 폼 데이터

    /**
     * 새로운 FormData 객체를 생성하여 할당
     */
    function initializeFormData() {
        formData.value = new FormData();
    }

    /**
     * 업로드된 파일을 업데이트
     *
     * @param {Event} event - 파일 업로드 이벤트
     */
    const handleFileUpload = (event) => {
        formData.value.delete('file')
        formData.value.append('file', ...event.target.files)
    }

    /**
     * 서버로 전송할 폼 데이터 객체를 반환
     *
     * @returns {FormData} 폼 데이터 객체
     */
    function getSubmitFormData() {
        formData.value.append('board', new Blob([JSON.stringify(board.value)], {type: 'application/json'}))
        return formData.value
    }

    return {
        board,
        useInitializeFormData: initializeFormData,
        useHandleFileUpload: handleFileUpload,
        getSubmitFormData,
    }
}
