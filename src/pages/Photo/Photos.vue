<script setup>
import PhotoCard from "@/components/card/PhotoCard.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import Pagination from "@/components/common/Pagination.vue";
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

// useFindSubCodeGroup 커스텀 훅을 사용하여 포토 서브코드 그룹 가져오기
const photoSubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.PHOTO);

// 게시글 목록을 담는 반응성 객체
const fetchPhotosData = ref(null);

// 초기 검색 조건을 담는 반응성 객체
const initialCondition = useInitialCondition();

/**
 * 사진 게시글 목록을 가져오는 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function getPhotos(condition) {
  await PostService.fetchPhotos(condition).then(response => {
    fetchPhotosData.value = response?.data
  }).catch(error => {
    console.log(error)
  })
}

// 컴포넌트가 마운트되기 전에 게시글 목록을 가져옴
getPhotos(initialCondition.value)
</script>

<template>
  <!-- 게시글 목록이 있을 경우 -->
  <template v-if="fetchPhotosData !== null">
    <!-- 포토 배너와 검색 폼, 포스트 네비게이션 바 사용 -->
    <BannerSub :banner-path="`home-photo.png`"/>

    <!-- 컨테이너 -->
    <b-container class="mt-3">
      <b-row>
        <!-- Main content -->
        <b-col class="3">
          <!-- 검색 폼 컴포넌트 SearchForm 사용 -->
          <searchForm :condition="initialCondition"
                      @search="(updateSearchCondition) => getPhotos(updateSearchCondition)"
                      :categories="photoSubCodeGroup" :postFormRouteName="'PhotoForm'"/>

          <b-row>
            <!-- PhotoCard 컴포넌트 사용하여 포토 게시글 카드 표시 -->
            <PhotoCard :posts="fetchPhotosData" :PostRouteName="`PhotoPost`"/>

            <!-- 페이지네이션 컴포넌트 Pagination 사용 -->
            <Pagination/>
          </b-row>
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