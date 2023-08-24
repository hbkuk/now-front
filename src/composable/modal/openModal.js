/**
 * 모달을 보이게 하기 위한 컴포저블 함수
 *
 * @param {string} elementId - 모달 요소의 ID
 */
export function useOpenModal(elementId) {

    /**
     * 주어진 ID를 가진 모달 요소를 보이게 설정
     *
     * @param {string} elementId - 모달 요소의 ID
     */
    const modalElement = document.getElementById(elementId);
    if (modalElement) {
        modalElement.style.display = "block"; // 모달을 보이게 설정
    }
}
