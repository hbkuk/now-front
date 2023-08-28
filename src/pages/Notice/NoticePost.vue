<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {onBeforeUpdate, ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/post/deletePostSubmit";
import Error from "@/components/common/Error.vue";
import BannerSub from "@/components/common/BannerSub.vue";
import {usePostReactionSubmit} from "@/composable/submitForm/reaction/reactionSubmit";
import {store} from "@/store";
import {useCommentSubmit} from "@/composable/submitForm/comment/commentSubmit";

// 게시글을 담는 반응성 객체
const fetchNoticeData = ref(null);

// props 설정, postIdx를 props로 전달받음
const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 커뮤니티 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getNotice(postIdx) {
  return PostService.fetchNotice(postIdx).then(response => {
    fetchNoticeData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// props로 전달된 postIdx를 이용하여 커뮤니티 게시글 가져오기 함수 호출
getNotice(props.postIdx);

// 커스텀 훅을 사용하여 게시글 반응과 관련된 변수와 함수들을 가져옴
const {
  fetchPostReactionData,
  getPostReact,
  updatePostReaction,
  useSubmit : useUpdatePostReactionSubmit,
} = usePostReactionSubmit(
    fetchNoticeData,
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
  try {
    await useUpdatePostReactionSubmit(props.postIdx);
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

// 컴포넌트의 데이터가 변경되고 화면이 업데이트되기 직전에 실행
onBeforeUpdate(() => {
  if (store.isMemberSignedIn()) {
    getPostReact(props.postIdx, false);
  }
});


// useDeletePostSubmit 커스텀 훅을 사용하여 게시글 삭제에 필요한 데이터와 함수 가져오기
const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Notices", PostService.deleteNotice);

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
} = useCommentSubmit(fetchNoticeData, showSaveCommentNotification, showEditCommentNotification, showDeleteCommentNotification);

</script>

<template>
  <!-- 게시글 정보가 있을 경우 -->
  <template v-if="fetchNoticeData">

    <!-- 게시글 배경 배너와 헤더 컴포넌트 사용 -->
    <BannerSub :banner-path="`good-post.png`"/>
    <PostFormHeader :routeNameForPush="'Notices'"/>

    <b-container class="mt-3">
      <!-- 삭제 에러가 있을 경우, 에러 메시지 출력 -->
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>
      <!-- 게시글 컴포넌트 Post 사용 -->
      <Post :post="fetchNoticeData"
            :postEditRouteName="`NoticeEdit`"
            :postReaction="fetchPostReactionData"
            @updatePostReaction="(reaction) => handleUpdatePostReactionSubmit(reaction)"
            @deletePost="useSubmit(postIdx)" />


      <!-- 댓글 관련 알림 -->
      <div v-if="isNotificationVisible" class="text-center alert alert-primary" role="alert">
        <b>{{ notificationMessage }}</b>
      </div>


      <!-- 댓글 정보가 있을 경우 -->
      <template v-if="fetchNoticeData.comments">
        <!-- 댓글 컴포넌트 Comments 사용 -->
        <Comments :comments="fetchNoticeData.comments"
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

  <!-- 게시글 정보가 없을 경우 (로딩 중) -->
  <template v-else>
    <!-- 배경 배너 스켈레톤 컴포넌트 BackgroundBannerSkeleton 사용 -->
    <BackgroundBannerSkeleton/>
    <!-- 게시글 스켈레톤 컴포넌트 PostSkeleton 사용 -->
    <PostSkeleton/>
  </template>
</template>