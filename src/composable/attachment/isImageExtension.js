import {AttachmentType} from "@/composable/attachment/constants/AttachmentType";

/**
 * 주어진 확장자가 이미지 확장자라면 true 반환, 그렇지 않다면 false 반환
 * 
 * @param extension 확장자
 * @returns {boolean} 확장자라면 true 반환, 그렇지 않다면 false 반환
 */
export function isImageExtension(extension) {
    return AttachmentType.IMAGE.allowedExtensions.includes(extension.split(".").pop().toLowerCase());
}
