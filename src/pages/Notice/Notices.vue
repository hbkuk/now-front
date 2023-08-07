<script setup>
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import PostNavbarSkeleton from "@/components/skeleton/PostNavbarSkeleton.vue";
import SearchFormSkeleton from "@/components/skeleton/SearchFormSkeleton.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";
import PaginationSkeleton from "@/components/skeleton/PaginationSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import BannerSub from "@/components/common/BannerSub.vue";
import {useInitialCondition} from "@/composable/param/initialCondition";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useUpdateUrl} from "@/composable/param/updateUrl";
import {useConvertKeysToConditionParams} from "@/composable/param/constants/conditionParams";

// 공지 게시글의 하위 코드 그룹 가져오기
const noticeSubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.NOTICE);

// 게시글 목록을 담는 반응성 객체
const fetchNoticesData = ref(null);

// 초기 검색 조건을 담는 반응성 객체
const initialCondition = useInitialCondition(ROUTE_NAME_GROUP.NOTICE.code);

/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getNotices(condition) {
  return PostService.fetchNotices(condition).then(response => {
    fetchNoticesData.value = response?.data
    useUpdateUrl("/notices", useConvertKeysToConditionParams(condition));
  }).catch(error => {
    console.log(error)
  })
}

// 초기 검색 조건을 이용하여 공지 게시글 목록 가져오기 함수 호출
getNotices(initialCondition.value)

/**
 * 페이지 변경 함수
 *
 * @param {number} changePageNo - 변경된 페이지 번호
 */
function changePage(pageNo) {
  initialCondition.value.pageNo = pageNo
  getNotices(initialCondition.value)
}


</script>

<template>
  <!-- 게시글 목록 정보가 있을 경우 -->
  <template v-if="fetchNoticesData !== null">
    <!-- 배경 배너 컴포넌트 BackgroundBanner 사용 -->
    <BannerSub :banner-path="`home-notice.png`"/>

    <!-- 컨테이너 -->
    <b-container class="mt-3">
      <b-row>
        <!-- Main content -->
        <b-col class="3">
          <!-- 검색 폼 컴포넌트 SearchForm 사용 -->
          <searchForm :condition="initialCondition"
                      @search="(updateSearchCondition) => getNotices(updateSearchCondition)"
                      :categories="noticeSubCodeGroup" :postFormRouteName="'NoticeForm'"/>


          <!-- 게시글 목록 컴포넌트 PostList 사용 -->
          <PostList :posts="fetchNoticesData.notices"
                    :postRouteName="`NoticePost`"/>

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination :page="fetchNoticesData.page"
                      @changePageNo="(changePageNo) => changePage(changePageNo)" />
        </b-col>
      </b-row>
    </b-container>
  </template>

  <!-- 게시글 목록 정보가 없을 경우 (로딩 중) -->
  <template v-else>
    <!-- 배경 배너 스켈레톤 컴포넌트 BackgroundBannerSkeleton 사용 -->
    <BackgroundBannerSkeleton/>
    <!-- 컨테이너 -->
    <b-container class="mt-3">
      <b-row>
        <!-- Main content -->
        <b-col class="3">
          <!-- 검색 폼 스켈레톤 컴포넌트 SearchFormSkeleton 사용 -->
          <search-form-skeleton />
          <!-- 게시글 네비게이션 바 스켈레톤 컴포넌트 PostNavbarSkeleton 사용 -->
          <PostNavbarSkeleton />
          <!-- 게시글 목록 스켈레톤 컴포넌트 PostListSkeleton 사용 -->
          <PostListSkeleton :posts-count=10 />
          <!-- 페이지네이션 스켈레톤 컴포넌트 PaginationSkeleton 사용 -->
          <PaginationSkeleton />
        </b-col>
      </b-row>
    </b-container>
  </template>
</template>