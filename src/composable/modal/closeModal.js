/**
 * 모달을 숨기기 위한 컴포저블 함수
 *
 * @param {string} elementId - 모달 요소의 ID
 */
export function useCloseModal(elementId) {

    /**
     * 주어진 ID를 가진 모달 요소를 숨김
     *
     * @param {string} elementId - 모달 요소의 ID
     */
    const modalElement = document.getElementById(elementId);
    if (modalElement) {
        modalElement.style.display = "none";
    }
}
