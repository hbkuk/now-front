/**
 * 대쉬("-")를 공백(" ")으로 바꾸고 각 단어의 첫 글자를 대문자로 변환 컴포저블
 *
 * @param {string} text - 변환할 문자열
 * @returns {string} 대쉬가 공백으로 바뀌고 각 단어의 첫 글자가 대문자로 변환된 결과 문자열
 */
export function useCapitalizeFirstLetter(text) {
    return text.replace(/_/g, ' ').toLowerCase().replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
}