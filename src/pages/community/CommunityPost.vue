<script setup>
import Post from "@/components/Post.vue";
import {onBeforeUpdate, ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import AttachmentList from "@/components/AttachmentList.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import Error from "@/components/common/Error.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/post/deletePostSubmit";
import BannerSub from "@/components/common/BannerSub.vue";
import {store} from "@/store";
import {usePostReactionSubmit} from "@/composable/submitForm/reaction/reactionSubmit";
import {useCommentSubmit} from "@/composable/submitForm/comment/commentSubmit";
import {useGetPostSubmit} from "@/composable/submitForm/post/getPostSubmit";

// 게시글 번호를 props로 전달받음
const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

// 커스텀 훅을 사용하여 게시글 조회와 관련된 변수와 함수들을 가져옴
const {
  fetchPostData: fetchCommunityData,
  useSubmit: getCommunity,
} = useGetPostSubmit(PostService.fetchCommunity)

/**
 * 커뮤니티 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */

// 커스텀 훅을 사용하여 게시글 반응과 관련된 변수와 함수들을 가져옴
const {
  fetchPostReactionData,
  getPostReact,
  updatePostReaction,
  useSubmit: useUpdatePostReactionSubmit,
} = usePostReactionSubmit(
    fetchCommunityData,
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

// 게시글 가져오기 함수 호출
getCommunity(props.postIdx);

// 컴포넌트의 데이터가 변경되고 화면이 업데이트되기 직전에 실행
onBeforeUpdate(() => {
  if (store.isMemberSignedIn()) {
    getPostReact(props.postIdx, false);
  }
});

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
} = useCommentSubmit(fetchCommunityData, showSaveCommentNotification, showEditCommentNotification, showDeleteCommentNotification);

// 커스텀 훅을 사용하여 게시글 삭제를 위한 변수와 함수들을 가져옴
const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Communities", PostService.deleteCommunity);

</script>

<template>
  <!-- 게시글이 로딩되었을 때 -->
  <template v-if="fetchCommunityData">
    <!-- 게시글 배경 배너와 헤더 컴포넌트 사용 -->
    <BannerSub :image-name="`good-post.png`"/>
    <PostFormHeader :routeNameForPush="'Communities'"/>

    <b-container class="mt-3">
      <!-- 게시글 삭제 시 에러가 있을 때 에러 컴포넌트 출력 -->
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>

      <!-- Post 컴포넌트 사용 -->
      <Post :post="fetchCommunityData"
            :postEditRouteName="`CommunityEdit`"
            :postReaction="fetchPostReactionData"
            @updatePostReaction="(reaction) => handleUpdatePostReactionSubmit(reaction)"
            @deletePost="useSubmit(postIdx)">
        <!-- 게시글 첨부파일 목록이 있을 경우 AttachmentList 컴포넌트 출력 -->
        <template v-if="fetchCommunityData.attachments">
          <AttachmentList :attachments="fetchCommunityData.attachments"/>
        </template>
      </Post>

      <!-- 댓글 관련 알림 -->
      <div v-if="isNotificationVisible" class="text-center alert alert-primary" role="alert">
        <b>{{ notificationMessage }}</b>
      </div>

      <!-- 게시글의 댓글 목록이 있을 경우 Comments 컴포넌트 출력 -->
      <template v-if="fetchCommunityData.comments">
        <Comments :comments="fetchCommunityData.comments"
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

  <!-- 게시글 로딩 중일 때 -->
  <template v-else>
    <!-- BackgroundBannerSkeleton 컴포넌트 출력 -->
    <BackgroundBannerSkeleton/>
    <!-- PostSkeleton 컴포넌트 출력 -->
    <PostSkeleton/>
  </template>
</template>