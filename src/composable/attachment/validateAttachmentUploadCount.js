/**
 * 파일 업로드 개수가 최대 업로드 횟수를 초과하면 true, 그렇지 않으면 false를 반환
 *
 * @param {FileList} files - 확인할 파일 목록
 * @param {number} maxUploadCount - 최대 업로드 횟수
 * @returns {boolean} 최대 업로드 횟수를 초과하면 true, 그렇지 않으면 false를 반환
 */
export function useValidateAttachmentUploadCount(files, maxUploadCount) {
    return files.length > maxUploadCount;
}