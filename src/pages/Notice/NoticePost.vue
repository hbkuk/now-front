<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import Comments from "@/components/Comments.vue";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";

/** 게시글을 담는 반응성 객체 */
const fetchNoticeData = ref(null);

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
  return PostService.fetchNotice(postIdx).then(response => {
    fetchNoticeData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getNotice(props.postIdx);

</script>

<template>
  <template v-if="fetchNoticeData">
  <BackgroundBanner :title="`Notice`" :banner-path="`community.png`"/>

  <b-container class="mt-3">
      <Post :post="fetchNoticeData"
            :PostEditRouteName="`NoticeEdit`"/>
      <template v-if="fetchNoticeData.comments">
        <Comments :comments="fetchNoticeData.comments" />
      </template>
  </b-container>
  </template>
</template>