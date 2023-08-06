<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import AttachmentList from "@/components/AttachmentList.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import Error from "@/components/common/Error.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/deletePostSubmit";
import BannerSub from "@/components/common/BannerSub.vue";

// 게시글을 담는 반응성 객체
const fetchCommunityData = ref(null);

// 게시글 번호를 props로 전달받음
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
async function getCommunity(postIdx) {
  return PostService.fetchCommunity(postIdx).then(response => {
    fetchCommunityData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// 게시글 가져오기 함수 호출
getCommunity(props.postIdx);

// 커스텀 훅을 사용하여 게시글 삭제를 위한 변수와 함수들을 가져옴
const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Communities", PostService.deleteCommunity);

</script>

<template>
  <!-- 게시글이 로딩되었을 때 -->
  <template v-if="fetchCommunityData">
    <!-- 게시글 배경 배너와 헤더 컴포넌트 사용 -->
    <BannerSub :banner-path="`good-post.png`"/>
    <PostFormHeader :routeNameForPush="'Communities'"/>

    <b-container class="mt-3">
      <!-- 게시글 삭제 시 에러가 있을 때 에러 컴포넌트 출력 -->
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>

      <!-- Post 컴포넌트 사용 -->
      <Post :post="fetchCommunityData" :postEditRouteName="`CommunityEdit`" @delete="useSubmit(postIdx)">
        <!-- 게시글 첨부파일 목록이 있을 경우 AttachmentList 컴포넌트 출력 -->
        <template v-if="fetchCommunityData.attachments">
          <AttachmentList :attachments="fetchCommunityData.attachments"/>
        </template>
      </Post>

      <!-- 게시글의 댓글 목록이 있을 경우 Comments 컴포넌트 출력 -->
      <template v-if="fetchCommunityData.comments">
        <Comments :comments="fetchCommunityData.comments"/>
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