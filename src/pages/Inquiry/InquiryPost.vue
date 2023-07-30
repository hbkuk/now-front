<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import Comments from "@/components/Comments.vue";
import Answer from "@/components/Answer.vue";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";
import ErrorType from "@/composable/response/ErrorType";

/** 게시글을 담는 반응성 객체 */
const fetchInquiryData = ref(null);

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
  return PostService.fetchInquiry(postIdx).then(response => {
    fetchInquiryData.value = response?.data
  }).catch(error => {
    console.log(error);
    const errorCode = error?.response?.data?.errorCode;
    if(errorCode === ErrorType.CAN_NOT_VIEW_SECRET_INQUIRY) {
      // TODO: 모달 혹은 컴포넌트 이동 후 비밀번호 입력
      console.log("비밀번호를 입력하세요.")
    }
  })
}

getInquiry(props.postIdx);

</script>

<template>
  <template v-if="fetchInquiryData">
  <BackgroundBanner :title="`Inquiry`" :banner-path="`community.png`"/>

  <b-container class="mt-3">
      <Post :post="fetchInquiryData"
            :PostEditRouteName="`InquiryEdit`"/>
      <Answer :post="fetchInquiryData" />
      <template v-if="fetchInquiryData.comments">
        <Comments :comments="fetchInquiryData.comments" />
      </template>
  </b-container>
  </template>
</template>