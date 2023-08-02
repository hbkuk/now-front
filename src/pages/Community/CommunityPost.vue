<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import Error from "@/components/common/Error.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/deletePostSubmit";
import ErrorType from "@/composable/response/ErrorType";

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


const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Communities", PostService.deleteCommunity);

</script>

<template>
  <template v-if="fetchCommunityData">
    <BackgroundBanner :title="`Community`" :banner-path="`community.png`"/>
    <PostFormHeader :routeNameForPush="'Communities'"/>
    <b-container class="mt-3">
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>
      <Post :post="fetchCommunityData"
            :postEditRouteName="`CommunityEdit`"
            @delete="useSubmit(postIdx)" >
        <template v-if="fetchCommunityData.attachments">
          <AttachmentList :attachments="fetchCommunityData.attachments"/>
        </template>
      </Post>
      <template v-if="fetchCommunityData.comments">
        <Comments :comments="fetchCommunityData.comments"/>
      </template>
    </b-container>
  </template>
  <template v-else>
    <BackgroundBannerSkeleton/>
    <PostSkeleton/>
  </template>
</template>