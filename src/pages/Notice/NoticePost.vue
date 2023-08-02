<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/deletePostSubmit";
import Error from "@/components/common/Error.vue";

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

const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Notices", PostService.deleteNotice);

</script>

<template>
  <template v-if="fetchNoticeData">
    <BackgroundBanner :title="`Notice`" :banner-path="`community.png`"/>
    <PostFormHeader :routeNameForPush="'Notices'"/>
    <b-container class="mt-3">
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>
      <Post :post="fetchNoticeData"
            :postEditRouteName="`NoticeEdit`"
            @delete="useSubmit(postIdx)" />
      <template v-if="fetchNoticeData.comments">
        <Comments :comments="fetchNoticeData.comments"/>
      </template>
    </b-container>
  </template>
  <template v-else>
    <BackgroundBannerSkeleton/>
    <PostSkeleton/>
  </template>
</template>