import {ref} from 'vue';
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import CommentService from "@/service/CommentService";

/**
 * 댓글 작성, 편집, 삭제 관련 동작을 처리하는 컴포저블 함수
 *
 * @param {null} targetComment - 대상 댓글 정보
 * @param {Function} showSaveCommentNotification - 댓글 저장 알림 표시 함수
 * @param {Function} showEditCommentNotification - 댓글 편집 알림 표시 함수
 * @param {Function} showDeleteCommentNotification - 댓글 삭제 알림 표시 함수
 * @returns {Object} 댓글 작성, 편집, 삭제 동작을 다루는 함수 및 반응성 속성들을 포함하는 객체를 반환합니다.
 */
export function useCommentSubmit(targetComment, showSaveCommentNotification,
                                 showEditCommentNotification, showDeleteCommentNotification) {

    const saveSubmitError = ref(null);
    const saveComment = ref({});
    const successSaveComment = ref(false);

    const editSubmitError = ref(null);
    const editComment = ref({});
    const successEditComment = ref(false);

    const deleteSubmitError = ref(null);

    /**
     * 저장할 댓글 정보를 업데이트
     *
     * @param {Object} comment - 업데이트할 댓글 정보
     */
    function updateSaveComment(comment) {
        saveComment.value = comment;
    }

    /**
     * 편집할 댓글 정보를 업데이트
     *
     * @param {Object} comment - 업데이트할 댓글 정보
     */
    function updateEditComment(comment) {
        editComment.value = comment;
    }

    /**
     * 댓글을 저장하고 서버에 전송하는 함수
     *
     * @param {Object} comment - 저장할 댓글 정보
     * @returns {Promise<void>}
     */
    async function handleSaveCommentSubmit(comment) {
        successSaveComment.value = null;
        updateSaveComment(comment);
        try {
            await useSaveSubmit(targetComment.value.postIdx);
        } catch (error) {
            successSaveComment.value = false;
            console.error('요청 실패:', error);
        }
    }

    /**
     * 댓글 저장 서비스 호출 함수
     *
     * @param {number} postIdx - 게시물 인덱스
     * @returns {Promise<void>}
     */
    async function useSaveSubmit(postIdx) {
        try {
            await CommentService.saveComment(postIdx, new Blob([JSON.stringify(saveComment.value)], {type: 'application/json'}));

            const response = await CommentService.fetchAllCommentsByPostIdx(postIdx);
            targetComment.value.comments = response.data.comments;
            saveSubmitError.value = null;
            successSaveComment.value = true;
            showSaveCommentNotification()
        } catch (error) {
            successSaveComment.value = false;
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSaveSubmit(postIdx));
                return;
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                saveSubmitError.value = error.response.data.message;
                return;
            }
            return Promise.reject(error);
        }
    }

    /**
     * 댓글 편집을 처리하는 함수
     *
     * @param {number} commentIdx - 편집할 댓글의 인덱스
     * @param {Object} comment - 편집할 댓글 정보
     */
    async function handleEditCommentSubmit(commentIdx, comment) {
        successEditComment.value = null;
        updateEditComment(comment);
        try {
            await useEditSubmit(commentIdx, targetComment.value.postIdx);
        } catch (error) {
            successEditComment.value = false;
            console.error('요청 실패:', error);
        }
    }

    /**
     * 댓글 편집 서비스 호출 함수
     *
     * @param {number} commentIdx - 편집할 댓글의 인덱스
     * @param {number} postIdx - 게시물 인덱스
     * @returns {Promise<void>}
     */
    async function useEditSubmit(commentIdx, postIdx) {
        try {
            await CommentService.editComment(postIdx, commentIdx, new Blob([JSON.stringify(editComment.value)], {type: 'application/json'}));

            const response = await CommentService.fetchAllCommentsByPostIdx(postIdx);
            targetComment.value.comments = response.data.comments;
            editSubmitError.value = null;
            successEditComment.value = true;
            showEditCommentNotification()
        } catch (error) {
            successEditComment.value = false;
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSaveSubmit(postIdx));
                return;
            }
            if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
                editSubmitError.value = error.response.data.message;
                return;
            }
            if (error.response?.data?.errorCode === ErrorType.CAN_NOT_UPDATE_OTHER_MEMBER_COMMENT) {
                deleteSubmitError.value = error.response.data;
                return;
            }
            return Promise.reject(error);
        }
    }

    /**
     * 댓글 삭제를 처리하는 함수
     *
     * @param {number} commentIdx - 삭제할 댓글의 인덱스
     */
    async function useDeleteSubmit(commentIdx) {
        try {
            await CommentService.deleteComment(targetComment.value.postIdx, commentIdx);
            const response = await CommentService.fetchAllCommentsByPostIdx(targetComment.value.postIdx);
            targetComment.value.comments = response.data.comments;
            deleteSubmitError.value = null;
            showDeleteCommentNotification()
        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useDeleteSubmit(commentIdx));
                return;
            }
            if (error.response?.data?.errorCode === ErrorType.CAN_NOT_DELETE_OTHER_MEMBER_COMMENT) {
                deleteSubmitError.value = error.response.data;
                return;
            }
            return Promise.reject(error);
        }
    }

    return {
        handleSaveCommentSubmit,
        handleEditCommentSubmit,
        saveComment,
        saveSubmitError,
        successSaveComment,
        editComment,
        editSubmitError,
        successEditComment,
        useDeleteSubmit
    };
}
