<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import InquiryEditForm from "@/pages/Inquiry/component/InquiryEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";

/** 게시글을 담는 반응성 객체 */
const fetchEditInquiryData = ref(null);

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
async function getEditInquiry(postIdx) {
  try {
    const response = await PostService.fetchEditInquiry(postIdx);
    fetchEditInquiryData.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => getEditInquiry(postIdx));
    }
  }
}

getEditInquiry(props.postIdx);
</script>
<template>
  <template v-if="fetchEditInquiryData">
  <PostFormHeader :routeNameForPush="'Inquiries'"/>
    <InquiryEditForm :post="fetchEditInquiryData" />
  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <PostSkeleton/>
  </template>
</template>