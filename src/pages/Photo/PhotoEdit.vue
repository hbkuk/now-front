<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PhotoEditForm from "@/pages/Photo/component/PhotoEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";
import router from "@/router/router";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";

/** 게시글을 담는 반응성 객체 */
const fetchEditPhotoData = ref(null);

const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 사진 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getEditPhoto(postIdx) {
  try {
    const response = await PostService.fetchEditPhoto(postIdx);
    fetchEditPhotoData.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => getEditPhoto(postIdx));
    }
  }
}

getEditPhoto(props.postIdx);

</script>
<template>
  <template v-if="fetchEditPhotoData">
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
      <PhotoEditForm :post="fetchEditPhotoData" />
  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <PostSkeleton/>
  </template>
</template>