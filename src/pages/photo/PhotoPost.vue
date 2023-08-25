<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import Carousel from "@/components/Carousel.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import AttachmentList from "@/components/AttachmentList.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/post/deletePostSubmit";
import Error from "@/components/common/Error.vue";
import BannerSub from "@/components/common/BannerSub.vue";
import {usePostReactionSubmit} from "@/composable/submitForm/reaction/reactionSubmit";
import {store} from "@/store";

// 게시글을 담는 반응성 객체
const fetchPhotoData = ref(null);

// props 설정, postIdx를 props로 전달받음.
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
async function getPhoto(postIdx) {
  await PostService.fetchPhoto(postIdx).then(response => {
    fetchPhotoData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// 컴포넌트가 마운트되기 전에 게시글 정보를 가져옴
getPhoto(props.postIdx);

// 커스텀 훅을 사용하여 게시글 반응과 관련된 변수와 함수들을 가져옴
const {
  fetchPostReactionData,
  getPostReact,
  updatePostReaction,
  useSubmit : useUpdatePostReactionSubmit,
} = usePostReactionSubmit(
    fetchPhotoData,
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
    = useDeletePostSubmit("Photos", PostService.deletePhoto);

</script>

<template>
  <!-- 게시글 정보가 있을 경우 -->
  <template v-if="fetchPhotoData">
    <!-- 게시글 배경 배너와 헤더 컴포넌트 사용 -->
    <BannerSub :banner-path="`good-post.png`"/>
    <PostFormHeader :routeNameForPush="'Photos'"/>

    <b-container class="mt-3">
      <!-- 삭제 오류가 있을 경우, 오류 메시지 출력 -->
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>
      <!-- Post 컴포넌트 사용하여 게시글 표시 -->
      <Post :post="fetchPhotoData"
            :postEditRouteName="`PhotoEdit`"
            :postReaction="fetchPostReactionData"
            @updatePostReaction="(reaction) => handleUpdatePostReactionSubmit(reaction)"
            @delete="useSubmit(postIdx)">
        <!-- 게시글에 첨부파일이 있을 경우, Carousel과 AttachmentList 컴포넌트 사용하여 표시 -->
        <template v-if="fetchPhotoData.attachments">
          <Carousel :attachments="fetchPhotoData.attachments"/>
          <AttachmentList :attachments="fetchPhotoData.attachments"/>
        </template>
      </Post>
      <!-- 게시글에 댓글이 있을 경우, Comments 컴포넌트 사용하여 표시 -->
      <template v-if="fetchPhotoData.comments">
        <Comments :comments="fetchPhotoData.comments"/>
      </template>
    </b-container>
  </template>

  <!-- 게시글 정보가 없을 경우 -->
  <template v-else>
    <!-- 로딩 중을 나타내는 배너와 스켈레톤 컴포넌트 사용 -->
    <BackgroundBannerSkeleton/>
    <PostSkeleton/>
  </template>
</template>