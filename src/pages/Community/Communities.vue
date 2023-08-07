<script setup>
import PostList from "@/components/table/PostList.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import {ref} from "vue";
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
import {useConvertKeysToConditionParams} from "@/composable/param/constants/conditionParams";
import {useInitialCondition} from "@/composable/param/initialCondition";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useUpdateUrl} from "@/composable/param/updateUrl";

// 커뮤니티 게시글의 하위 코드 그룹을 가져오기 위해 커스텀 훅 사용
const communitySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.COMMUNITY);

// 게시글 목록을 담는 반응성 객체
const fetchCommunitiesData = ref(null);

// 초기 검색 조건을 담는 반응성 객체
const initialCondition = useInitialCondition(ROUTE_NAME_GROUP.COMMUNITY.code);

/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getCommunities(condition) {
  console.log(condition)
  return PostService.fetchCommunities(condition).then(response => {
    fetchCommunitiesData.value = response.data
    useUpdateUrl("/communities", useConvertKeysToConditionParams(condition));
  }).catch(error => {
    console.log(error)
  })
}

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
getCommunities(initialCondition.value)

/**
 * 페이지 변경 함수
 *
 * @param {number} changePageNo - 변경된 페이지 번호
 */
function changePage(pageNo) {
  initialCondition.value.pageNo = pageNo
  getCommunities(initialCondition.value)
}

</script>

<template>
  <template v-if="fetchCommunitiesData !== null">
    <!-- BannerSub 컴포넌트 사용 -->
    <BannerSub :banner-path="`home-community.png`"/>

    <b-container class="mt-3">
      <b-row>
        <b-col class="3">
          <!-- 검색 폼 -->
          <searchForm :condition="initialCondition"
                      @search="(updateSearchCondition) => getCommunities(updateSearchCondition)"
                      :categories="communitySubCodeGroup" :postFormRouteName="'CommunityForm'"/>

          <!-- PostList 컴포넌트 사용 -->
          <PostList :posts="fetchCommunitiesData.communities"
                    :postRouteName="`CommunityPost`"/>

          <!-- Pagination 컴포넌트 사용 -->
          <Pagination :page="fetchCommunitiesData.page"
                      @changePageNo="(changePageNo) => changePage(changePageNo)" />
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
