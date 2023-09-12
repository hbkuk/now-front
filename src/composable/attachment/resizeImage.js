/**
 * 이미지를 비동기적으로 resize
 *
 * @param {File} file - 리사이즈할 이미지 파일
 * @param {number} maxWidth - 최대 폭(너비) 제한
 * @returns {Promise<File>} - 리사이즈된 이미지 파일을 포함한 Promise
 * @throws {Error} - 이미지 로딩 또는 리사이징 중에 발생한 오류
 */
export async function useResizeImage(file, maxWidth) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let newWidth = img.width;
                let newHeight = img.height;

                if (img.width > maxWidth) {
                    const scaleFactor = maxWidth / img.width;
                    newWidth = maxWidth;
                    newHeight = img.height * scaleFactor;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob((blob) => {
                    const resizedFile = new File([blob], file.name, {type: file.type});
                    resolve(resizedFile); // 리사이즈된 파일을 반환
                }, file.type);
            };

            img.onerror = function (error) {
                reject(error);
            };
        };

        reader.readAsDataURL(file);
    });
}