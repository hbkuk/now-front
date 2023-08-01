/**
 * 첨부 파일 타입을 나타내는 객체
 *
 * 허용된 확장자, 최대 업로드 크기, 최대 업로드 횟수
 */
export const AttachmentType = {
    FILE: {
        allowedExtensions: ["jpg", "gif", "png", "zip"],
        maxUploadSize: 2048000,
        maxUploadCount: 5,
    },
    IMAGE: {
        allowedExtensions: ["jpg", "gif", "png"],
        maxUploadSize: 1024000,
        maxUploadCount: 20,
    },
};
