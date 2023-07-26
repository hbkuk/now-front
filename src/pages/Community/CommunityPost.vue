<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import DataService from "@/service/DataService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import Comments from "@/components/Comments.vue";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";

/** 게시글을 담는 반응성 객체 */
const fetchCommunityData = ref(null);

/** 게시글을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchCommunityError = ref(null);

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
async function getCommunity(postIdx) {
  const [response] = await Promise.all([DataService.fetchCommunity(postIdx)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchCommunityData.value = result.data
    fetchCommunityError.value = null
  } else {
    fetchCommunityError.value = result?.error;
  }
}

getCommunity(props.postIdx);

</script>

<template>
  <BackgroundBanner :title="`Community`" :banner-path="`community.png`"/>

  <b-container class="mt-3">
    <template v-if="fetchCommunityData">
      <Post :post="fetchCommunityData" >
        <template v-if="fetchCommunityData.attachments">
          <AttachmentList :attachments="fetchCommunityData.attachments"/>
        </template>
      </Post>
      <template v-if="fetchCommunityData.comments">
        <Comments :comments="fetchCommunityData.comments" />
      </template>
    </template>
  </b-container>
</template>