import { computed, ref, watch } from 'vue'

/**
 * 게시글 수정 폼을 관리하는 컴포저블
 *
 * @param {object} modifyViewData - 수정할 게시글 데이터
 * @returns {object} 게시글 수정 폼 관련 함수와 상태를 포함한 객체
 */
export function useModifySubmitForm(modifyViewData) {
    const board = ref(null) // 게시글 데이터
    const formData = ref(new FormData()) // 폼 데이터


    /**
     * 새로운 FormData 객체를 생성하여 할당
     */
    function InitializeFormData() {
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
        formData.value.append('fileIdx', fileIndexes.value)
        formData.value.append('board', new Blob([JSON.stringify(board.value)], { type: 'application/json' }))
        return formData.value
    }

    /**
     * 파일 인덱스에 해당하는 파일을 삭제
     *
     * @param {number} fileIdx - 삭제할 파일의 인덱스
     */
    function deleteFileByFileIdx(fileIdx) {
        board.value.files = board.value.files.filter((file) => file.fileIdx !== fileIdx)
    }

    /**
     * 파일의 인덱스를 계산된 속성으로 반환
     *
     * @returns {number[]} 파일의 인덱스 배열
     */
    const fileIndexes = computed(() => {
        return board.value.files.map((file) => file.fileIdx)
    })

    /**
     * modifyBoardData 객체를 감시하고 값이 변경될 때마다 boardData에 새로운 값을 할당
     *
     * @param {object} newModifyBoardData - 변경된 modifyBoardData 객체
     */
    watch(modifyViewData, (newModifyBoardData) => {
        board.value = newModifyBoardData.board
    })

    return {
        board,
        useInitializeFormData: InitializeFormData,
        useHandleFileUpload: handleFileUpload,
        useDeleteFileByFileIdx: deleteFileByFileIdx,
        getSubmitFormData,
    }
}
