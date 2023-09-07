<script setup>
import Post from "@/components/Post.vue";
import {onBeforeUpdate, ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import Answer from "@/components/Answer.vue";
import ErrorType from "@/composable/response/ErrorType";
import CommonMessage from "@/components/common/CommonMessage.vue";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import router from "@/router/router";
import Error from "@/components/common/Error.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import {store} from "@/store";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/post/deletePostSubmit";
import BannerSub from "@/components/common/BannerSub.vue";
import {usePostReactionSubmit} from "@/composable/submitForm/reaction/reactionSubmit";
import {useCommentSubmit} from "@/composable/submitForm/comment/commentSubmit";
// 게시글을 담는 반응성 객체
const fetchInquiryData = ref(null);

// 게시글 번호를 props로 전달받음
const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 문의 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getInquiry(postIdx) {
  try {
    const response = await PostService.fetchInquiry(postIdx);
    fetchInquiryData.value = response?.data;
  } catch (error) {
    console.log(error);
    const errorCode = error?.response?.data?.errorCode;

    // TODO: 코드 리팩토링
    if (errorCode === ErrorType.CAN_NOT_VIEW_SECRET_INQUIRY) {
      if (store.isMemberSignedIn()) {
        try {
          const response = await PostService.fetchSecretInquiry(postIdx);
          fetchInquiryData.value = response?.data;
        } catch (error) {
          if (error?.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
            try {
              await useRefreshTokenAndRetry(() => getInquiry(postIdx));
            } catch (error) {
              modalShow.value = true;
            }
          } else {
            modalShow.value = true;
          }
        }
      }
      if (!store.isMemberSignedIn()) {
        modalShow.value = true;
      }
    }
  }
}

// 게시글 가져오기 함수 호출
getInquiry(props.postIdx);

// 커스텀 훅을 사용하여 게시글 반응과 관련된 변수와 함수들을 가져옴
const {
  fetchPostReactionData,
  getPostReact,
  updatePostReaction,
  useSubmit: useUpdatePostReactionSubmit,
} = usePostReactionSubmit(
    fetchInquiryData,
    PostService.fetchPostReaction,
    PostService.savePostReaction)

/**
 * 게시글 반응 수정
 *
 * @param reaction 반응 정보
 * @returns {Promise<void>}
 */
async function handleUpdatePostReactionSubmit(reaction) {
  updatePostReaction(reaction)
  await useUpdatePostReactionSubmit(props.postIdx);
}


// 컴포넌트의 데이터가 변경되고 화면이 업데이트되기 직전에 실행
onBeforeUpdate(() => {
  if (store.isMemberSignedIn()) {
    getPostReact(props.postIdx, false);
  }
});

// 반환된 에러를 담는 반응성 객체
const submitError = ref(null)

// 비밀번호 모달 반응성 객체
const modalShow = ref(false)

// 비밀글 열람을 위한 입력된 비밀번호 반응성 객체
const password = ref('')

/**
 * 비밀번호 초기화 함수
 */
function resetPassword() {
  password.value = ''
}

/**
 * 비밀글 열람 확인 버튼 함수
 *
 * @param {Event} bvModalEvent - 모달 이벤트 객체
 */
function handleOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleSubmit()
}

/**
 * 비밀글 열람 서버 패스워드 전송 함수
 */
async function handleSubmit() {
  const formData = new FormData
  formData.append('password', password.value)

  try {
    const response = await PostService.fetchSecretInquiry(props.postIdx, formData);
    modalShow.value = false;
    fetchInquiryData.value = response?.data;
  } catch (error) {
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => handleSubmit());
    }
    if (error.response?.data?.errorCode === ErrorType.CAN_NOT_VIEW_OTHER_MEMBER_INQUIRIES) {
      submitError.value = error.response?.data;
    }
    if (error.response?.data?.errorCode === ErrorType.CAN_NOT_VIEW_INQUIRY_PASSWORD_NOT_MATCH) {
      submitError.value = error.response?.data;
    }
  }
}

// 커스텀 훅을 사용하여 게시글 삭제를 위한 변수와 함수들을 가져옴
const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Inquiries", PostService.deleteInquiry);


const notificationMessage = ref(null);
const isNotificationVisible = ref(false);

function showNotification(message) {
  notificationMessage.value = message
  isNotificationVisible.value = true;
  setTimeout(() => {
    isNotificationVisible.value = false;
  }, 2000); // 2초 후에 알림 숨김
};

function showSaveCommentNotification() {
  showNotification('댓글이 성공적으로 작성되었습니다.')
};

function showEditCommentNotification() {
  showNotification('댓글이 성공적으로 수정되었습니다.')
};

function showDeleteCommentNotification() {
  showNotification('댓글이 성공적으로 삭제되었습니다.')
};

// 커스텀 훅을 사용하여 댓글과 관련된 변수와 함수들을 가져옴
const {
  handleSaveCommentSubmit,
  handleEditCommentSubmit,
  saveSubmitError,
  successSaveComment,
  editSubmitError,
  successEditComment,
  useDeleteSubmit,
} = useCommentSubmit(fetchInquiryData, showSaveCommentNotification, showEditCommentNotification, showDeleteCommentNotification);

</script>

<template>
  <template v-if="fetchInquiryData">
    <!-- 게시글 배경 배너와 헤더 컴포넌트 사용 -->
    <BannerSub :image-name="`good-post.png`"/>
    <PostFormHeader :routeNameForPush="'Inquiries'"/>

    <!-- 게시글 데이터가 로딩되었을 경우 -->
    <b-container class="mt-3">
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <!-- deleteSubmitError가 null이 아니고 error 속성이 null이 아닐 경우 에러 컴포넌트 Error로 에러 메시지 표시 -->
        <Error :error="deleteSubmitError"/>
      </template>
      <!-- Post 컴포넌트로 게시글 데이터를 표시하고 삭제 이벤트 처리 -->
      <Post :post="fetchInquiryData"
            :postEditRouteName="`InquiryEdit`"
            :postReaction="fetchPostReactionData"
            @updatePostReaction="(reaction) => handleUpdatePostReactionSubmit(reaction)"
            @deletePost="useSubmit(postIdx)"/>
      <template v-if="fetchInquiryData.answerManagerNickname">
        <!-- fetchInquiryData.answerManagerNickname이 존재하는 경우 Answer 컴포넌트로 답변 데이터 표시 -->
        <Answer :post="fetchInquiryData"/>
      </template>

      <!-- 댓글 관련 알림 -->
      <div v-if="isNotificationVisible" class="text-center alert alert-primary" role="alert">
        <b>{{ notificationMessage }}</b>
      </div>


      <template v-if="fetchInquiryData.comments">
        <!-- fetchInquiryData.comments가 존재하는 경우 Comments 컴포넌트로 댓글 데이터 표시 -->
        <Comments :comments="fetchInquiryData.comments"
                  :saveSubmitError="saveSubmitError"
                  :successSaveComment="successSaveComment"
                  :editSubmitError="editSubmitError"
                  :successEditComment="successEditComment"
                  @saveComment="(newComment) => handleSaveCommentSubmit(newComment)"
                  @editComment="(commentIdx, editingComment) => handleEditCommentSubmit(commentIdx, editingComment)"
                  @deleteComment="(commentIdx) => useDeleteSubmit(commentIdx)"
        />
      </template>
    </b-container>
  </template>
  <template v-else-if="modalShow">
    <!-- 데이터 로딩 중이면서 modalShow 값이 true인 경우 -->
    <!-- CommonMessage 컴포넌트로 비밀글 설정 안내 메시지 표시 -->
    <CommonMessage :imageName="`secret.jpg`" :title="`비밀글 설정`" :content="`이 게시글은 비밀글로 설정되어있습니다.`"/>
  </template>
  <template v-else>
    <!-- 데이터 로딩 중이면서 modalShow 값이 false인 경우 -->
    <!-- BackgroundBannerSkeleton 컴포넌트로 스켈레톤 형식의 배경 이미지 표시 -->
    <BackgroundBannerSkeleton/>
    <!-- PostSkeleton 컴포넌트로 스켈레톤 형식의 게시글 데이터 표시 -->
    <PostSkeleton/>
  </template>

  <!-- 모달 -->
  <b-modal
      id="inputPasswordModal"
      ref="modal"
      v-model="modalShow"
      title="비밀글 열람"
      cancel-title="목록 이동"
      ok-title="열람하기"
      button-size="sm"
      @show="resetPassword"
      @hidden="resetPassword"
      @ok="handleOk"
      @cancel="router.push({name:`Inquiries`})"
      @close="router.push({name:`Inquiries`})"
      centered
      no-close-on-backdrop
  >

    <!-- 비밀번호 입력 폼 -->
    <b>비밀번호를 입력해 주세요.</b>
    <b-form class="mt-3">
        <b-form-group label-for="new-password-input">
          <b-form-input
              v-model="password"
              id="new-input-password"
              type="password"
              autocomplete="off"
          ></b-form-input>
        </b-form-group>
    </b-form>
    <!-- submitError가 null이 아닐 경우 에러 컴포넌트 Error로 에러 메시지 표시 -->
    <div v-if="submitError !== null">
      <Error :error="submitError"/>
    </div>
  </b-modal>

</template>