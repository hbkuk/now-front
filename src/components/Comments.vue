<script setup>
import {defineProps, ref, watch} from "vue";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";
import ValidationError from "@/components/common/ValidationError.vue";
import {store} from "@/store";
import CharacterCounter from "@/components/common/CharacterCounter.vue";

const emit = defineEmits(['saveComment', 'deleteComment', 'editComment'])

const props = defineProps({
  comments: Array,
  saveSubmitError: Object,
  successSaveComment: Boolean,
  editSubmitError: Object,
  successEditComment: Boolean,
});

const comment = ref({
  content: ''
})

const editingCommentIdx = ref(null);

const editingComment = ref({
  content: ''
});

const deleteModalCommentIdx = ref(null);

const isShowDeleteModal = ref(false);

/**
 * 댓글을 저장하는 함수
 *
 * @function
 */
function saveComment() {
  if(!store.isMemberSignedIn()) {
    store.openSignInModal();
    return;
  }
  emit('saveComment', comment.value);
}

/**
 * 댓글 수정 버튼을 클릭할 때 호출되는 함수
 *
 * @function
 * @param {number} commentIdx - 수정할 댓글의 인덱스
 * @param {string} content - 수정할 댓글의 내용
 */
function handleEditClick(commentIdx, content) {
  editingCommentIdx.value = commentIdx;
  editingComment.value.content = content;
}

/**
 * 댓글 수정 취소 버튼을 클릭할 때 호출되는 함수
 *
 * @function
 */
function handleResetEditClick() {
  editingCommentIdx.value = null;
  editingComment.value.content = '';
}

/**
 * 수정한 댓글을 저장하는 함수
 *
 * @function
 */
function editComment() {
  emit('editComment', editingCommentIdx.value, editingComment.value);
}

/**
 * 삭제 모달을 표시하는 함수
 *
 * @function
 * @param {number} commentIdx - 삭제할 댓글의 인덱스
 */
function showDeleteModal(commentIdx) {
  deleteModalCommentIdx.value = commentIdx;
  isShowDeleteModal.value = true;
}

/**
 * 삭제 모달의 확인 버튼을 클릭할 때 호출되는 함수
 *
 * @function
 */
function handleDeleteOk() {
  isShowDeleteModal.value = false;
  emit('deleteComment', deleteModalCommentIdx.value);
}

// 댓글 수정 성공 여부를 감시하고, 성공 시 수정 중인 댓글 관련 상태를 초기화하는 watch
watch(() => isShowDeleteModal.value, (newIsShowDeleteModal) => {
  console.log(newIsShowDeleteModal)
});

// 댓글 저장 성공 여부를 감시하고, 성공 시 댓글 내용을 초기화하는 watch
watch(() => props.successSaveComment, (newSuccessSaveComment) => {
  if (newSuccessSaveComment) {
    comment.value.content = ''
  }
});

// 댓글 수정 성공 여부를 감시하고, 성공 시 수정 중인 댓글 관련 상태를 초기화하는 watch
watch(() => props.successEditComment, (newSuccessEditComment) => {
  if (newSuccessEditComment) {
    editingCommentIdx.value = null
    editingComment.value.content = ''
  }
});
</script>

<template>
  <template v-if="saveSubmitError !== null && saveSubmitError.content !== null">
    <ValidationError :message="saveSubmitError.content"/>
  </template>

  <div>
    <div class="form-outline mb-2">
      <b-form-textarea v-model="comment.content"
                       class="form-control p-3 mt-2"
                       rows="2"
                       id="comment"
                       name="text"
                       minlength="1"
                       maxlength="2000"
                       placeholder="댓글 입력(최대 2000자) ...">
      </b-form-textarea>
      <CharacterCounter
          :currentCharacterCount="comment.content?.length"
          :maxCharacterCount="2000"
      />
    </div>
    <div class="mb-4 text-end">
      <b-button @click="saveComment" variant="primary" size="sm">댓글 등록</b-button>
    </div>

    <div class="comment-list">
      <div v-for="(comment, commentIdx) in comments" :key="commentIdx" class="card mb-4 card-comment">

        <div v-if="comment.commentIdx === editingCommentIdx" class="card-body">

          <template v-if="editSubmitError !== null && editSubmitError.content !== null">
            <ValidationError :message="editSubmitError.content"/>
          </template>


          <div class="form-outline mb-2">
            <b-form-textarea
                v-model="editingComment.content"
                class="form-control p-3 mt-2"
                rows="2"
                id="comment"
                name="text"
                placeholder="댓글 수정(최대 2000자) ...">
            </b-form-textarea>
            <CharacterCounter
                :currentCharacterCount="editingComment.content?.length"
                :maxCharacterCount="2000"
            />
          </div>
          <div class="d-flex justify-content-end">
            <div class="me-3">
              <b-button @click="handleResetEditClick" variant="danger" size="sm">수정 취소</b-button>
            </div>
            <div>
              <b-button @click="editComment()" variant="primary" size="sm">수정 하기</b-button>
            </div>
          </div>
        </div>

        <b-container class="py-3">

          <b-row align-h="between" class="justify-content-start mb-3">

            <div class="d-flex" v-if="store.isSameMember(comment.memberNickname)">
              <b-col cols="6">
                <div>
                  <i class="bi bi-person-circle pe-2 b-md-icon"></i>
                  <span class="truncate-text">{{ comment.memberNickname }}</span>
                  <span class="truncate-text">{{ comment.managerNickname }}</span>
                </div>
              </b-col>

              <b-col cols="6" class="d-flex justify-content-end">
                <div class="text-nowrap flex-row align-items-end">
                  <b-button @click="handleEditClick(comment.commentIdx, comment.content)" variant="link"
                            class="text-secondary">
                    <i class="bi bi-eraser b-md-icon"></i> 수정
                  </b-button>
                  <b-button @click="showDeleteModal(comment.commentIdx)" variant="link" class="text-secondary">
                    <i class="bi bi-trash b-md-icon"></i> 삭제
                  </b-button>
                </div>
              </b-col>
            </div>

            <div v-else>
              <b-col cols="12">
                <div>
                  <i class="bi bi-person-circle pe-2 b-md-icon"></i>
                  <span class="truncate-text">{{ comment.memberNickname }}</span>
                  <span class="truncate-text">{{ comment.managerNickname }}</span>
                </div>
              </b-col>
            </div>

          </b-row>

          <b-row align-h="between" class="justify-content-start my-3">
            <b-col cols="12" class="text-container-wrap">
              <div v-dompurify-html="comment.content"></div>
            </b-col>
          </b-row>

          <b-row align-h="between" class="justify-content-start">
            <b-col cols="6">
              <div class="p-0 d-flex align-items-center">
                {{ useGetTimeDifference(comment.regDate) }}
              </div>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-end">
              <div class="d-flex flex-row align-items-center">
                <i class="bi bi-chevron-up mx-2 b-md-icon"></i>
                <p class="small text-muted mb-0">기능 준비중</p>
                <i class="ms-2 bi-chevron-down b-md-icon"></i>
              </div>
            </b-col>
          </b-row>

        </b-container>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <b-modal
      id="deleteModal"
      ref="modal"
      v-model="isShowDeleteModal"
      cancel-title="취소하기"
      ok-title="삭제하기"
      @ok="handleDeleteOk"
      centered
  >
    <template #title>
      <h5 class="modal-title"><b>
        <b-badge variant="warning">WARN</b-badge>&nbsp;댓글 삭제 확인</b></h5>
    </template>
    <b class="mb-0">정말로 삭제하시겠습니까?</b>
  </b-modal>
</template>