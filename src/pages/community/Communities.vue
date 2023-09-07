<script setup>
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import PostService from "@/service/PostService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import SearchFormSkeleton from "@/components/skeleton/SearchFormSkeleton.vue";
import PostNavbarSkeleton from "@/components/skeleton/PostNavbarSkeleton.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";
import PaginationSkeleton from "@/components/skeleton/PaginationSkeleton.vue";
import BannerSub from "@/components/common/BannerSub.vue";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useGetPostsSubmit} from "@/composable/submitForm/post/getPostsSubmit";
import router from "@/router/router";
import PageInfo from "@/components/common/PageInfo.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import {onBeforeUpdate, ref} from "vue";

// 게시글의 하위 코드 그룹 찾기
const communitySubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.COMMUNITY);

const {
  fetchPostsData: fetchCommunitiesData,
  initialCondition,
  updateCondition,
  changePage,
  useSubmit
} = useGetPostsSubmit(
    router.currentRoute.value.query,
    ROUTE_NAME_GROUP.COMMUNITY.code,
    PostService.fetchCommunities,
    "/communities",
);

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
useSubmit(initialCondition.value)

</script>

<template>
  <template v-if="fetchCommunitiesData !== null">
    <!-- BannerSub 컴포넌트 사용 -->
    <BannerSub :image-name="`home-community.png`"/>

    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- 검색 폼 -->
          <searchForm :condition="initialCondition"
                      @search="(updateSearchCondition) => updateCondition(updateSearchCondition)"
                      :categories="communitySubCodeGroup" :postFormRouteName="'CommunityForm'">
            <PageInfo :page="fetchCommunitiesData.page" />
          </searchForm>
          <!-- PostList 컴포넌트 사용 -->
          <PostList :posts="fetchCommunitiesData.communities"
                    :postRouteName="`CommunityPost`"/>

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination :page="fetchCommunitiesData.page"
                      @changePageNo="(changePageNo) => changePage(changePageNo)"/>
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
