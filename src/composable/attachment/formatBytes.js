/**
 * 바이트를 포맷팅하는 함수
 * 기본 단위는 1byte이며, 자릿수가 일의 자리수를 넘지 않도록 바이트를 포맷팅
 * 소수점은 둘째 자리까지 반올림하여 표시
 *
 * @param {number} bytes 포맷팅할 바이트 수
 * @returns {string} 예쁘게 포맷팅된 바이트 문자열
 */
export function useFormatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const base = 1024; // 기본 단위는 1byte이므로 1024로 수정
    let i = 0;
    while (bytes >= base && i < units.length - 1) {
        bytes /= base;
        i++;
    }
    return `${Math.round(bytes * 10) / 10}${units[i]}`;
}
