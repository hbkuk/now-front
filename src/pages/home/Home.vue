<script setup>
import Banner from "@/components/common/Banner.vue";
import PostTable from "@/components/table/PostList.vue";
import {ref} from "vue";
import DataService from "@/service/DataService";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import {useResponseHandler} from "@/composable/response/responseHandler";
import Error from "@/components/common/Error.vue";

/** 게시글 목록을 담는 반응성 객체 */
const fetchPostsData = ref({
  notices: null,
  communities: null,
  photos: null,
  inquiries: null
})

/** 게시글 목록을 가져올때 발생하는 에러를 담는 반응성 객체 */
const fetchPostsError = ref(null)

/** 검색 조건을 담는 반응성 객체 */
const condition = ref({
  maxNumberOfPosts: 5
})

/**
 * 공지 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getNotices(condition) {
  const [response] = await Promise.all([DataService.fetchNotices(condition)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPostsData.value.notices = result.data
    fetchPostsError.value = null
  } else {
    fetchPostsError.value = result?.error;
  }
}

/**
 * 커뮤니티 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getCommunities(condition) {
  const [response] = await Promise.all([DataService.fetchCommunities(condition)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPostsData.value.communities = result.data
    fetchPostsError.value = null
  } else {
    fetchPostsError.value = result?.error;
  }
}

/**
 * 사진 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getPhotos(condition) {
  const [response] = await Promise.all([DataService.fetchPhotos(condition)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPostsData.value.photos = result.data
    fetchPostsError.value = null
  } else {
    fetchPostsError.value = result?.error;
  }
}

/**
 * 문의 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getInquiries(condition) {
  const [response] = await Promise.all([DataService.fetchInquiries(condition)])
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    fetchPostsData.value.inquiries = result.data
    fetchPostsError.value = null
  } else {
    fetchPostsError.value = result?.error;
  }
}

getNotices(condition.value)
getCommunities(condition.value)
getPhotos(condition.value)
getInquiries(condition.value)

</script>
<template>
  <Banner
      :router-name="`Home`"
      :banner-path="`home.png`"
  />

  <!-- 조건부 렌더링 1: 서버 통신 fail -->
  <template v-if="fetchPostsError !== null">
    <Error :error="fetchPostsError"/>
  </template>

  <b-container class="mt-3">
    <b-row>
      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Notices`"
            :banner-path="`home-notice.png`"
        />
        <template v-if="fetchPostsData.notices !== null">
          <PostTable
            :posts="fetchPostsData.notices"
          />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Communities`"
            :banner-path="`home-community.png`"
        />
        <template v-if="fetchPostsData.communities !== null">
          <PostTable
              :posts="fetchPostsData.communities"
          />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Photos`"
            :banner-path="`home-photo.png`"/>
        <template v-if="fetchPostsData.photos !== null">
          <PostTable
              :posts="fetchPostsData.photos"
          />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Inquiries`"
            :banner-path="`home-inquiry.png`"/>
        <template v-if="fetchPostsData.inquiries !== null">
          <PostTable
              :posts="fetchPostsData.inquiries"
          />
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

