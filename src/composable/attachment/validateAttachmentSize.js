/**
 * 파일의 크기가 최대 업로드 크기를 초과하면 true, 그렇지 않으면 false 반환
 *
 * @param {FileList} files - 확인할 파일 목록
 * @param {number} maxUploadSize - 최대 업로드 크기 (바이트 단위)
 * @returns {boolean} 최대 업로드 크기를 초과하면 true, 그렇지 않으면 false를 반환
 */
export function useValidateAttachmentSize(files, maxUploadSize) {
    for (const file of files) {
        return file.size > maxUploadSize;
    }
}