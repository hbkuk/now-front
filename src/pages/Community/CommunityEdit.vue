<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import CommunityEditForm from "@/pages/Community/component/CommunityEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";

/** 게시글을 담는 반응성 객체 */
const fetchEditCommunityData = ref(null);

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
async function getEditCommunity(postIdx) {
  try {
    const response = await PostService.fetchEditCommunity(postIdx);
    fetchEditCommunityData.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => getEditCommunity(postIdx));
    }
  }
}

getEditCommunity(props.postIdx);

</script>
<template>
  <template v-if="fetchEditCommunityData">
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
      <CommunityEditForm :post="fetchEditCommunityData" />
  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <PostSkeleton/>
  </template>
</template>