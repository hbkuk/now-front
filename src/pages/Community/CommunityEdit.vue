<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import CommunityEditForm from "@/pages/Community/component/CommunityEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";

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
  const [response] = await Promise.all([PostService.fetchCommunity(postIdx)])
  const result = await useResponseHandler(response, ResponseSuccessCode.GET);

  if (isResponseSuccess(result.type)) {
    fetchCommunityData.value = result.data.data
    fetchCommunityError.value = null
  } else {
    fetchCommunityError.value = result?.error;
  }
}

getCommunity(props.postIdx);

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <template v-if="fetchCommunityData">
      <CommunityEditForm :post="fetchCommunityData" />
    </template>
</template>