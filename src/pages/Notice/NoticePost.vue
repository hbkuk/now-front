<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/deletePostSubmit";
import Error from "@/components/common/Error.vue";
import BannerSub from "@/components/common/BannerSub.vue";
import {usePostReactionSubmit} from "@/composable/submitForm/reactionSubmit";
import {store} from "@/store";

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

// 게시글 반응 가져오기 함수 호출
if (store.isMemberSignedIn()) {
  getPostReact(props.postIdx, false);
}


// useDeletePostSubmit 커스텀 훅을 사용하여 게시글 삭제에 필요한 데이터와 함수 가져오기
const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Notices", PostService.deleteNotice);

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
            @delete="useSubmit(postIdx)" />
      <!-- 댓글 정보가 있을 경우 -->
      <template v-if="fetchNoticeData.comments">
        <!-- 댓글 컴포넌트 Comments 사용 -->
        <Comments :comments="fetchNoticeData.comments"/>
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