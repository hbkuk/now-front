<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import NoticeEditForm from "@/pages/Notice/component/NoticeEditForm.vue";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";

// 게시글을 담는 반응성 객체
const fetchEditNoticeData = ref(null);

// props 설정, 게시글 번호를 props로 전달받음
const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 공지 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getEditNotice(postIdx) {
  try {
    const response = await PostService.fetchEditNotice(postIdx);
    fetchEditNoticeData.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      // 만료된 액세스 토큰일 경우 토큰 갱신 후 재시도
      await useRefreshTokenAndRetry(() => getEditNotice(postIdx));
    }
  }
}

// props로 전달된 postIdx를 이용하여 공지 게시글 가져오기 함수 호출
getEditNotice(props.postIdx);

</script>
<template>
  <!-- fetchEditNoticeData 값이 있을 경우 -->
  <template v-if="fetchEditNoticeData">
    <!-- 배경 배너 컴포넌트 BackgroundBanner 사용 -->
    <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <!-- 게시글 작성 헤더 컴포넌트 PostFormHeader 사용 -->
    <PostFormHeader :routeNameForPush="'Notices'"/>
    <!-- 공지 게시글 편집 폼 컴포넌트 NoticeEditForm 사용 -->
    <NoticeEditForm :post="fetchEditNoticeData" />
  </template>

  <!-- fetchEditNoticeData 값이 없을 경우 (로딩 중) -->
  <template v-else>
    <!-- 배경 배너 스켈레톤 컴포넌트 BackgroundBannerSkeleton 사용 -->
    <BackgroundBannerSkeleton />
    <!-- 게시글 스켈레톤 컴포넌트 PostSkeleton 사용 -->
    <PostSkeleton/>
  </template>
</template>