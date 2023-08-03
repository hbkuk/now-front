/**
 * 사진 게시글의 편집 옵션
 * @readonly
 * @enum {string}
 */
export const EditPhotoOptions = {
    /**
     * 기존 이미지 수정 옵션
     */
    EDIT_EXISTING: {
        text: '기존 이미지 수정',
        value: 'editExisting'
    },

    /**
     * 새로운 이미지 추가 옵션
     */
    ADD_NEW: {
        text: '새로운 이미지 추가',
        value: 'addNew'
    }
};
