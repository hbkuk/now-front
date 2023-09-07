<script setup>
import Banner from "@/components/common/Banner.vue";
import PostList from "@/components/table/PostList.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Error from "@/components/common/Error.vue";
import PostListSkeleton from "@/components/skeleton/PostListSkeleton.vue";

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
const initialCondition = ref({
  maxNumberOfPosts: 5
})

/**
 * 모든 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getPosts(condition) {
  return PostService.fetchPosts(condition).then(response => {
    fetchPostsData.value = response.data
  }).catch(error => {
    console.log(error)
  })
}

// 초기 검색 조건을 사용하여 게시글 목록을 가져오기 위해 함수 호출
getPosts(initialCondition.value)

</script>
<template>
  <Banner
      :router-name="`Home`"
      :image-name="`home.png`"
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
            :image-name="`home-notice.png`"
        />
        <template v-if="fetchPostsData.notices !== null">
          <PostList
            :posts="fetchPostsData.notices"
            :postRouteName="`NoticePost`"
          />
        </template>
        <template v-else>
          <PostListSkeleton />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Communities`"
            :image-name="`home-community.png`"
        />
        <template v-if="fetchPostsData.communities !== null">
          <PostList
              :posts="fetchPostsData.communities"
              :postRouteName="`CommunityPost`"
          />
        </template>
        <template v-else>
          <PostListSkeleton />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Photos`"
            :image-name="`home-photo.png`"/>
        <template v-if="fetchPostsData.photos !== null">
          <PostList
              :posts="fetchPostsData.photos"
              :postRouteName="`PhotoPost`"
          />
        </template>
        <template v-else>
          <PostListSkeleton />
        </template>
      </b-col>

      <b-col
          lg="6"
          class="mb-3"
      >
        <Banner
            :router-name="`Inquiries`"
            :image-name="`home-inquiry.png`"/>
        <template v-if="fetchPostsData.inquiries !== null">
          <PostList
              :posts="fetchPostsData.inquiries"
              :postRouteName="`InquiryPost`"
          />
        </template>
        <template v-else>
          <PostListSkeleton />
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

