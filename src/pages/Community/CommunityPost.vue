<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";

/** 게시글을 담는 반응성 객체 */
const fetchCommunityData = ref(null);

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
  return PostService.fetchCommunity(postIdx).then(response => {
    fetchCommunityData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getCommunity(props.postIdx);

</script>

<template>
  <template v-if="fetchCommunityData">
  <BackgroundBanner :title="`Community`" :banner-path="`community.png`"/>

  <b-container class="mt-3">
      <Post :post="fetchCommunityData"
            :PostEditRouteName="`CommunityEdit`">
        <template v-if="fetchCommunityData.attachments">
          <AttachmentList :attachments="fetchCommunityData.attachments"/>
        </template>
      </Post>
      <template v-if="fetchCommunityData.comments">
        <Comments :comments="fetchCommunityData.comments" />
      </template>
  </b-container>
  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <PostSkeleton/>
  </template>
</template>