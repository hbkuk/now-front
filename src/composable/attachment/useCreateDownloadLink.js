/**
 * Blob을 다운로드할 수 있는 링크를 생성 후 다운로드 트리거
 *
 * @param {Blob} blob - 다운로드할 Blob 데이터
 * @param {string} fileName - 다운로드될 파일의 원하는 이름
 */
export function useCreateDownloadLink(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}