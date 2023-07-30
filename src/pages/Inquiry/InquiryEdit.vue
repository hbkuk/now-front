<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import InquiryEditForm from "@/pages/Inquiry/component/InquiryEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";
import router from "@/router/router";

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
  return PostService.fetchEditInquiry(postIdx).then(response => {
    fetchEditInquiryData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getEditInquiry(props.postIdx);

</script>
<template>
  <template v-if="fetchEditInquiryData">
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
      <InquiryEditForm :post="fetchEditInquiryData" />
  </template>
</template>