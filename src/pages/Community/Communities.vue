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

/** 게시글 목록을 담는 반응성 객체 */
const fetchCommunitiesData = ref(null);

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
async function getCommunities(condition) {
  return PostService.fetchCommunities(condition).then(response => {
    fetchCommunitiesData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

getCommunities(initialCondition.value)

const communitySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.COMMUNITY);
</script>
<template>
  <BackgroundBanner
    :title="`Community`"
    :content="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"
    :banner-path="`community.png`"
  />

  <b-container class="mt-3">
    <b-row>
      <!-- Main content -->
      <b-col class="3">
        <searchForm/>
        <PostNavbar :categories="communitySubCodeGroup"
                    :PostFormRouteName="'CommunityForm'"/>
        <template v-if="fetchCommunitiesData !== null">
          <PostList :posts="fetchCommunitiesData"
                    :PostRouteName="`CommunityPost`"/>
          <Pagination/>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>