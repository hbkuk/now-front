<script setup>
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
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
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useGetPostsSubmit} from "@/composable/submitForm/post/getPostsSubmit";
import router from "@/router/router";
import PageInfo from "@/components/common/PageInfo.vue";
import {onBeforeUpdate} from "vue";

const noticeSubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.NOTICE);

const {
  fetchPostsData: fetchNoticesData,
  initialCondition,
  updateCondition,
  changePage,
  useSubmit
} = useGetPostsSubmit(
    router.currentRoute.value.query,
    ROUTE_NAME_GROUP.NOTICE.code,
    PostService.fetchNotices,
    "/notices",
);

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
useSubmit(initialCondition.value)

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
                      @search="(updateSearchCondition) => updateCondition(updateSearchCondition)"
                      :categories="noticeSubCodeGroup" :postFormRouteName="'NoticeForm'" >
            <PageInfo :page="fetchNoticesData.page" />
          </searchForm>

          <!-- 게시글 목록 컴포넌트 PostList 사용 -->
          <PostList :posts="fetchNoticesData.notices"
                    :postRouteName="`NoticePost`"/>

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination :page="fetchNoticesData.page"
                      @changePageNo="(changePageNo) => changePage(changePageNo)"/>
        </b-col>
      </b-row>
    </b-container>
  </template>

  <!-- 게시글 목록이 없을 경우 -->
  <template v-else>
    <!-- 로딩 중을 나타내는 배너와 스켈레톤 컴포넌트 사용 -->
    <BackgroundBannerSkeleton/>
    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- 검색 폼 스켈레톤 컴포넌트 SearchFormSkeleton 사용 -->
          <SearchFormSkeleton/>
          <!-- 게시글 네비게이션 바 스켈레톤 컴포넌트 PostNavbarSkeleton 사용 -->
          <PostNavbarSkeleton/>
          <!-- 게시글 목록 스켈레톤 컴포넌트 PostListSkeleton 사용 -->
          <PostListSkeleton :posts-count="10"/>
          <!-- 페이지네이션 스켈레톤 컴포넌트 PaginationSkeleton 사용 -->
          <PaginationSkeleton/>
        </b-col>
      </b-row>
    </b-container>
  </template>
</template>