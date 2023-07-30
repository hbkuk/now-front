<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import CommunityEditForm from "@/pages/Community/component/CommunityEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";
import NoticeEditForm from "@/pages/Notice/component/NoticeEditForm.vue";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";
import router from "@/router/router";

/** 게시글을 담는 반응성 객체 */
const fetchEditNoticeData = ref(null);

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
  return PostService.fetchEditNotice(postIdx).then(response => {
    fetchEditNoticeData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getEditNotice(props.postIdx);

</script>
<template>
  <template v-if="fetchEditNoticeData">
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
      <NoticeEditForm :post="fetchEditNoticeData" />
  </template>
</template>