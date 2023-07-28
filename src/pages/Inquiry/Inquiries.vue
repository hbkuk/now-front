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

/** 게시글 목록을 담는 반응성 객체 */
const fetchInquiriesData = ref(null);

/** 게시글 목록을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchInquiriesError = ref(null);

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
async function getInquiries(condition) {
  const [response] = await Promise.all([PostService.fetchInquiries(condition)])
  const result = await useResponseHandler(response, ResponseSuccessCode.GET);

  if (isResponseSuccess(result.type)) {
    fetchInquiriesData.value = result.data.data
    fetchInquiriesError.value = null
  } else {
    fetchInquiriesError.value = result?.error;
  }
}
getInquiries(initialCondition.value)

const inquirySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.INQUIRY);

</script>
<template>
  <BackgroundBanner
    :title="`Inquiry`"
    :content="`궁금한 모든 것들을 운영진에게 물어봐요.`"
    :banner-path="`community.png`"
  />

  <b-container class="mt-3">
    <b-row>
      <!-- Main content -->
      <b-col class="3">
        <searchForm/>
        <PostNavbar :categories="inquirySubCodeGroup"
                    :PostFormRouteName="'InquiryForm'"/>
        <template v-if="fetchInquiriesData !== null">
          <PostList :posts="fetchInquiriesData"
                    :PostRouteName="`InquiryPost`" />
        </template>
        <Pagination/>
      </b-col>
    </b-row>
  </b-container>
</template>