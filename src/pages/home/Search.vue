<script setup>
import Pagination from "@/components/common/Pagination.vue";
import {ref, watch} from "vue";
import PostService from "@/service/PostService";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import SearchFormSkeleton from "@/components/skeleton/SearchFormSkeleton.vue";
import PostNavbarSkeleton from "@/components/skeleton/PostNavbarSkeleton.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";
import PaginationSkeleton from "@/components/skeleton/PaginationSkeleton.vue";
import {useInitialParams} from "@/composable/param/InitialParams";
import router from "@/router/router";
import {useConvertKeysToConditionParams} from "@/composable/param/constants/conditionParams";
import {useUpdateUrl} from "@/composable/param/updateUrl";

// 게시글 목록을 담는 반응성 객체
const fetchSearchResultsData = ref(null);

// 초기 검색 조건을 담는 반응성 객체
const initialCondition = ref({
  startDate: useGetPastDate(365),
  endDate: useGetCurrentDate(),
  postGroup: null,
  category: null,
  keyword: null,
  pageNo: 1,
  maxNumberOfPosts: 10
});

watch(
    () => router.currentRoute.value.params,
    (updateParams) => {
      console.log(updateParams)

    })

/** 현재 라우터의 파라미터 확인 후 initialCondition 속성 덮어쓰기 */
Object.assign(initialCondition.value, useInitialParams(router.currentRoute.value.params));

/**
 * 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getPosts(condition) {
  return PostService.fetchPosts(useConvertKeysToConditionParams(condition)).then(response => {
    fetchSearchResultsData.value = response?.data
    useUpdateUrl("/search", useConvertKeysToConditionParams(condition));
  }).catch(error => {
    console.log(error)
  })
}

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
getPosts(initialCondition.value)
</script>

<template>
  <template v-if="fetchSearchResultsData !== null">
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- PostList 컴포넌트 사용 -->

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination/>
        </b-col>
      </b-row>
    </b-container>
  </template>

  <!-- 데이터 로딩 중이라면 스켈레톤 컴포넌트들을 출력 -->
  <template v-else>
    <BackgroundBannerSkeleton/>
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <search-form-skeleton/>
          <PostNavbarSkeleton/>
          <PostListSkeleton :posts-count="10"/>
          <PaginationSkeleton/>
        </b-col>
      </b-row>
    </b-container>
  </template>
</template>
