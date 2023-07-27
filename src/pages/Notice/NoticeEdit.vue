<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import CommunityEditForm from "@/pages/Community/component/CommunityEditForm.vue";
import {ref} from "vue";
import DataService from "@/service/DataService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";
import NoticeEditForm from "@/pages/Notice/component/NoticeEditForm.vue";

/** 게시글을 담는 반응성 객체 */
const fetchNoticeData = ref(null);

/** 게시글을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchNoticeError = ref(null);

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
async function getNotice(postIdx) {
  const [response] = await Promise.all([DataService.fetchNotice(postIdx)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchNoticeData.value = result.data
    fetchNoticeError.value = null
  } else {
    fetchNoticeError.value = result?.error;
  }
}

getNotice(props.postIdx);

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <template v-if="fetchNoticeData">
      <NoticeEditForm :post="fetchNoticeData" />
    </template>
</template>