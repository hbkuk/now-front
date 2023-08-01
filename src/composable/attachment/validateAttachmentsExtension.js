/**
 * 파일의 확장자가 허용된 확장자면 true, 그렇지 않으면 false 반환
 *
 * @param {FileList} files - 확인할 파일 목록
 * @param {string[]} allowedExtensions - 허용된 파일 확장자 목록
 * @returns {boolean} 허용된 확장자면 true, 그렇지 않으면 false를 반환
 */
export function useValidateAttachmentsExtension(files, allowedExtensions) {
    for (const file of files) {
        return !allowedExtensions.includes(file.name.split(".").pop().toLowerCase());
    }
}