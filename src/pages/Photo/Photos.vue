<script setup>
import PhotoCard from "@/components/card/PhotoCard.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import PostNavbar from "@/components/common/PostNavbar.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Pagination from "@/components/common/Pagination.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useResponseHandler} from "@/composable/response/responseHandler";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";
import {isResponseSuccess} from "@/composable/response/ResponseResultType";
import PostNavbarSkeleton from "@/components/skeleton/PostNavbarSkeleton.vue";
import SearchFormSkeleton from "@/components/skeleton/SearchFormSkeleton.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";
import PaginationSkeleton from "@/components/skeleton/PaginationSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import BannerSub from "@/components/common/BannerSub.vue";

/** 게시글 목록을 담는 반응성 객체 */
const fetchPhotosData = ref(null);

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
  await PostService.fetchPhotos(condition).then(response => {
    fetchPhotosData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getPhotos(initialCondition.value)

const photoSubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.PHOTO);

</script>
<template>
  <template v-if="fetchPhotosData !== null">
    <BannerSub
        :banner-path="`home-photo.png`"
    />
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <searchForm/>
          <PostNavbar :categories="photoSubCodeGroup"
                      :PostFormRouteName="'PhotoForm'"/>
          <b-row>
              <PhotoCard :posts="fetchPhotosData"
                         :PostRouteName="`PhotoPost`"/>
              <Pagination/>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <search-form-skeleton />
          <PostNavbarSkeleton />
          <PostListSkeleton :posts-count=10 />
          <PaginationSkeleton />
        </b-col>
      </b-row>
    </b-container>
  </template>
</template>