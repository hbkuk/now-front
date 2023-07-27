<script setup>
import PhotoCard from "@/components/card/PhotoCard.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import PostNavbar from "@/components/common/PostNavbar.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Pagination from "@/components/common/Pagination.vue";
import {ref} from "vue";
import DataService from "@/service/DataService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import {useFindSubCodeGroup} from "@/composable/store/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/store/PostGroup";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";

/** 게시글 목록을 담는 반응성 객체 */
const fetchPhotosData = ref(null);

/** 게시글 목록을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchPhotosError = ref(null);

/** 초기 검색 조건을 담는 반응성 객체 */
const initialCondition = ref({
  startDate: useGetPastDate(365),
  endDate: useGetCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1,

  maxNumberOfPosts: 12
});

/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getPhotos(condition) {
  const [response] = await Promise.all([DataService.fetchPhotos(condition)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPhotosData.value = result.data
    fetchPhotosError.value = null
  } else {
    fetchPhotosError.value = result?.error;
  }
}

getPhotos(initialCondition.value)

const photoSubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.PHOTO);

</script>
<template>
  <BackgroundBanner
      :title="`Photo`"
      :content="`다양한 사람들에게 사진을 공유 해요.`"
      :bannerPath="`community.png`"/>

  <b-container class="mt-3">
    <b-row>
      <b-col class="3">
        <searchForm/>
        <PostNavbar :categories="photoSubCodeGroup"
                    :PostFormRouteName="'PhotoForm'"/>
        <b-row>
          <template v-if="fetchPhotosData !== null">
            <PhotoCard :posts="fetchPhotosData"
                       :PostRouteName="`PhotoPost`"/>
            <Pagination/>
          </template>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>