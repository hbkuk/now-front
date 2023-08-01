<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostNavbar from "@/components/common/PostNavbar.vue";
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {useResponseHandler} from "@/composable/response/responseHandler";
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
const fetchNoticesData = ref(null);

/** 초기 검색 조건을 담는 반응성 객체 */
const initialCondition = ref({
  startDate: useGetPastDate(365),
  endDate: useGetCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1,

  maxNumberOfPosts: 10
});

/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getNotices(condition) {
  return PostService.fetchNotices(condition).then(response => {
    fetchNoticesData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getNotices(initialCondition.value)

const noticeSubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.NOTICE);

</script>
<template>
  <template v-if="fetchNoticesData !== null">
    <BannerSub
        :banner-path="`home-notice.png`"
    />

  <b-container class="mt-3">
    <b-row>
      <!-- Main content -->
      <b-col class="3">
        <searchForm/>
        <PostNavbar :categories="noticeSubCodeGroup"
                    :PostFormRouteName="'NoticeForm'"/>
          <PostList :posts="fetchNoticesData"
                    :PostRouteName="`NoticePost`"/>
        <Pagination/>
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