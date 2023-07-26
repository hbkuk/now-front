<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import DataService from "@/service/DataService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import Comments from "@/components/Comments.vue";
import Answer from "@/components/Answer.vue";

/** 게시글을 담는 반응성 객체 */
const fetchInquiryData = ref(null);

/** 게시글을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchInquiryError = ref(null);

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
async function getInquiry(postIdx) {
  const [response] = await Promise.all([DataService.fetchInquiry(postIdx)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchInquiryData.value = result.data
    fetchInquiryError.value = null
  } else {
    fetchInquiryError.value = result?.error;
  }
}

getInquiry(props.postIdx);

</script>

<template>
  <BackgroundBanner :title="`Inquiry`" :banner-path="`community.png`"/>

  <b-container class="mt-3">
    <template v-if="fetchInquiryData">
      <Post :post="fetchInquiryData" />
      <Answer :post="fetchInquiryData" />
      <template v-if="fetchInquiryData.comments">
        <Comments :comments="fetchInquiryData.comments" />
      </template>
    </template>
  </b-container>
</template>