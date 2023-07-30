<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import CommunityEditForm from "@/pages/Community/component/CommunityEditForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";

/** 게시글을 담는 반응성 객체 */
const fetchEditCommunityData = ref(null);

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
async function getEditCommunity(postIdx) {
  await PostService.fetchEditCommunity(postIdx).then(response => {
    fetchEditCommunityData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getEditCommunity(props.postIdx);

</script>
<template>
  <template v-if="fetchEditCommunityData">
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
      <CommunityEditForm :post="fetchEditCommunityData" />
  </template>
</template>