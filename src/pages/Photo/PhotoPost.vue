<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import Carousel from "@/components/Carousel.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import AttachmentList from "@/pages/Community/component/AttachmentList.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useDeletePostSubmit} from "@/composable/submitForm/deletePostSubmit";
import Error from "@/components/common/Error.vue";

/** 게시글을 담는 반응성 객체 */
const fetchPhotoData = ref(null);

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
async function getPhoto(postIdx) {
  await PostService.fetchPhoto(postIdx).then(response => {
    fetchPhotoData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getPhoto(props.postIdx);

const {deleteSubmitError, useSubmit}
    = useDeletePostSubmit("Photos", PostService.deletePhoto);

</script>

<template>
  <template v-if="fetchPhotoData">
    <BackgroundBanner :title="`Photo`" :banner-path="`community.png`"/>
    <PostFormHeader :routeNameForPush="'Photos'"/>
    <b-container class="mt-3">
      <template v-if="deleteSubmitError !== null && deleteSubmitError.error !== null">
        <Error :error="deleteSubmitError"/>
      </template>
      <Post :post="fetchPhotoData"
            :postEditRouteName="`PhotoEdit`"
            @delete="useSubmit(postIdx)" >
        <template v-if="fetchPhotoData.attachments">
          <Carousel :attachments="fetchPhotoData.attachments"/>
          <AttachmentList :attachments="fetchPhotoData.attachments"/>
        </template>
      </Post>
      <template v-if="fetchPhotoData.comments">
        <Comments :comments="fetchPhotoData.comments"/>
      </template>
    </b-container>
  </template>
  <template v-else>
    <BackgroundBannerSkeleton/>
    <PostSkeleton/>
  </template>
</template>