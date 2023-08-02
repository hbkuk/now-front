/**
 * 숫자를 포맷팅하여 K, M, G 등의 단위로 변환
 * 예: 1234 -> 1.2K, 567890 -> 567.9K, 12345678 -> 12.3M
 *
 * @param {number} number - 포맷팅할 숫자
 * @returns {string} 포맷팅된 숫자와 단위로 이루어진 문자열
 */
export function useFormatNumber(number) {
    const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let unitIndex = 0;
    while (number >= 1000 && unitIndex < units.length - 1) {
        number /= 1000;
        unitIndex++;
    }
    return `${number % 1 === 0 ? number.toFixed(0) : number.toFixed(1)} ${units[unitIndex]}`;
}