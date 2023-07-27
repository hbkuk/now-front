<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PhotoEditForm from "@/pages/Photo/component/PhotoEditForm.vue";
import {ref} from "vue";
import DataService from "@/service/DataService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";

/** 게시글을 담는 반응성 객체 */
const fetchPhotoData = ref(null);

/** 게시글을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchPhotoError = ref(null);

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
  const [response] = await Promise.all([DataService.fetchPhoto(postIdx)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPhotoData.value = result.data
    fetchPhotoError.value = null
  } else {
    fetchPhotoError.value = result?.error;
  }
}

getPhoto(props.postIdx);

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <template v-if="fetchPhotoData">
      <PhotoEditForm :post="fetchPhotoData" />
    </template>
</template>