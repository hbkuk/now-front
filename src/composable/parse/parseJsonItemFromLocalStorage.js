/**
 * localStorage에서 특정 아이템을 JSON 형태로 파싱하여 반환하는 컴포저블
 *
 * @param {string} item 파싱할 localStorage의 아이템 이름
 * @returns {any[]} 파싱된 JSON 배열 또는 객체, 아이템이 없으면 빈 객체를 반환
 */
export function useParseJsonItemFromLocalStorage(item) {
    const storedItem = localStorage.getItem(item);

    return storedItem ? JSON.parse(storedItem) : {};
}