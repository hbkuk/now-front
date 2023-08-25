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

// 문의 게시글의 토픽 하위 코드 그룹 가져오기
const inquirySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.INQUIRY);

const {
  fetchPostsData: fetchInquiriesData,
  initialCondition,
  updateCondition,
  changePage,
  useSubmit
} = useGetPostsSubmit(
    router.currentRoute.value.query,
    ROUTE_NAME_GROUP.INQUIRY.code,
    PostService.fetchInquiries,
    "/inquiries",
);

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
useSubmit(initialCondition.value)

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
          <searchForm :condition="initialCondition"
                      @search="(updateSearchCondition) => updateCondition(updateSearchCondition)"
                      :categories="inquirySubCodeGroup" :postFormRouteName="'InquiryForm'">
            <PageInfo :page="fetchInquiriesData.page" />
          </searchForm>

          <!-- 문의 게시글 목록을 표시하기 위한 PostList 컴포넌트 사용 -->
          <PostList :posts="fetchInquiriesData.inquiries"
                    :postRouteName="`InquiryPost`"/>

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination :page="fetchInquiriesData.page"
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