<script setup>
import PostNavbar from "@/components/common/PostNavbar.vue";
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import SearchFormSkeleton from "@/components/skeleton/SearchFormSkeleton.vue";
import PostNavbarSkeleton from "@/components/skeleton/PostNavbarSkeleton.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";
import PaginationSkeleton from "@/components/skeleton/PaginationSkeleton.vue";
import BannerSub from "@/components/common/BannerSub.vue";

// 커뮤니티 게시글의 하위 코드 그룹을 가져오기 위해 커스텀 훅 사용
const communitySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.COMMUNITY);

// 게시글 목록을 담는 반응성 객체
const fetchCommunitiesData = ref(null);

// 초기 검색 조건을 담는 반응성 객체
const initialCondition = ref({
  startDate: useGetPastDate(365), // 365일 이전 날짜를 가져오는 함수를 사용하여 시작 날짜 설정
  endDate: useGetCurrentDate(), // 현재 날짜를 가져오는 함수를 사용하여 끝 날짜 설정
  categoryIdx: null, // 토픽 카테고리 인덱스
  keyword: null, // 검색 키워드
  pageNo: 1, // 페이지 번호

  maxNumberOfPosts: 10 // 한 페이지에 표시할 게시글 최대 개수
});


/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getCommunities(condition) {
  return PostService.fetchCommunities(condition).then(response => {
    fetchCommunitiesData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
getCommunities(initialCondition.value)
</script>

<template>
  <template v-if="fetchCommunitiesData !== null">
    <!-- BannerSub 컴포넌트 사용 -->
    <BannerSub :banner-path="`home-community.png`"/>

    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- 검색 폼 -->
          <searchForm/>

          <!-- PostNavbar 컴포넌트 사용 -->
          <PostNavbar :categories="communitySubCodeGroup" :postFormRouteName="'CommunityForm'"/>

          <!-- PostList 컴포넌트 사용 -->
          <PostList :posts="fetchCommunitiesData" :postRouteName="`CommunityPost`"/>

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
