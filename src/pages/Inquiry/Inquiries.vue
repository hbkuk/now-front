<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostNavbar from "@/components/common/PostNavbar.vue";
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import {ref} from "vue";
import {ResponseSuccessCode} from "@/composable/response/ResponseSuccessCode";
import {useResponseHandler} from "@/composable/response/responseHandler";
import PostService from "@/service/PostService";
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

// 게시글 목록을 담는 반응성 객체
const fetchInquiriesData = ref(null);

// 커스텀 훅을 사용하여 초기 검색 조건을 설정
const initialCondition = ref({
  startDate: useGetPastDate(365), // 365일 이전 날짜
  endDate: useGetCurrentDate(), // 현재 날짜
  categoryIdx: null, // 토픽 카테고리 인덱스 (null은 모든 토픽을 의미)
  keyword: null, // 검색 키워드
  pageNo: 1, // 페이지 번호
  maxNumberOfPosts: 10 // 한 페이지에 표시할 게시글 수
});

/**
 * 문의 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getInquiries(condition) {
  return PostService.fetchInquiries(condition).then(response => {
    fetchInquiriesData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// 문의 게시글 목록 가져오기 함수 호출
getInquiries(initialCondition.value)

// 문의 게시글의 토픽 하위 코드 그룹 가져오기
const inquirySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.INQUIRY);

</script>
<template>
  <!-- 문의 게시글이 로딩되었을 때 -->
  <template v-if="fetchInquiriesData !== null">
    <!-- BannerSub 컴포넌트 사용 -->
    <BannerSub :banner-path="`home-inquiry.png`"/>

    <b-container class="mt-3">
      <b-row>
        <!-- Main content -->
        <b-col class="3">
          <!-- 검색 폼을 위한 searchForm 컴포넌트 사용 -->
          <searchForm/>
          <!-- 문의 게시글의 토픽 카테고리를 선택하기 위한 PostNavbar 컴포넌트 사용 -->
          <PostNavbar :categories="inquirySubCodeGroup" :postFormRouteName="'InquiryForm'"/>
          <!-- 문의 게시글 목록을 표시하기 위한 PostList 컴포넌트 사용 -->
          <PostList :posts="fetchInquiriesData" :postRouteName="`InquiryPost`" />
          <!-- 페이지네이션을 표시하기 위한 Pagination 컴포넌트 사용 -->
          <Pagination/>
        </b-col>
      </b-row>
    </b-container>
  </template>

  <!-- 문의 게시글 로딩 중일 때 -->
  <template v-else>
    <!-- BackgroundBannerSkeleton 컴포넌트 출력 -->
    <BackgroundBannerSkeleton />
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- 검색 폼 스켈레톤 출력 -->
          <search-form-skeleton />
          <!-- 문의 게시글의 토픽 카테고리 선택 스켈레톤 출력 -->
          <PostNavbarSkeleton />
          <!-- 문의 게시글 목록 스켈레톤 출력 -->
          <PostListSkeleton :posts-count=10 />
          <!-- 페이지네이션 스켈레톤 출력 -->
          <PaginationSkeleton />
        </b-col>
      </b-row>
    </b-container>
  </template>
</template>