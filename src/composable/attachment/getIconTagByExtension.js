import {isImageExtension} from "@/composable/attachment/isImageExtension";

/**
 * 확장자에 따라 해당 파일의 아이콘 태그를 반환
 *
 * 지원하는 확장자가 없는 경우 기본 아이콘 태그를 반환
 *
 * @param {string} extension 파일 확장자
 * @returns {string} 파일의 아이콘 태그
 */
export function useGetIconTagByExtension(extension) {
    const lowerCaseExtension = extension.toLowerCase();
    if (isImageExtension(lowerCaseExtension)) {
        return '<i class="bi bi-file-image"></i>';
    }
    if (!isImageExtension(lowerCaseExtension)) {
        if (lowerCaseExtension === "zip") {
            return '<i class="bi bi-file-earmark-zip"></i>';
        }
        return '<i class="bi bi-file-earmark"></i>';
    }
}
