export function useHideElement(elementId) {
    const modalElement = document.getElementById(elementId);
    if (modalElement) {
        modalElement.style.display = "none"; // 모달 숨기기
    }
}