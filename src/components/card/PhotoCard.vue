<script setup>
import {computed, defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import {useIsNewPost} from "@/composable/date/isNewPost";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";
import CommonMessage from "@/components/common/CommonMessage.vue";

const props = defineProps({
  posts: Object,
  PostRouteName: String,
});

const screenWidth = ref(window.innerWidth);

/**
 * 컬럼 클래스 Computed 속성
 *
 * @type {ComputedRef<unknown>}
 */
const getColumnClass = computed(() => {
  if (screenWidth.value >= 992) {
    return 'col-lg-3';
  }
  if (screenWidth.value >= 768) {
    return 'col-md-4';
  }
  return 'col-6';
});

/**
 * 화면 크기 변경 이벤트 핸들러
 */
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// 컴포넌트 언마운트 시 이벤트 리스너 해제
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;

</script>

<template>
  <template v-if="posts.length !== 0">
    <b-col v-for="(post, index) in posts" :key="index" class="mb-3" :class="getColumnClass">
      <b-card class="h-100 card-hover">
        <div>
          <div class="text-center">
            <b-badge pill variant="warning me-2" v-if="useIsNewPost(post.regDate)">NEW</b-badge>
            <b-badge pill variant="primary" class="d-inline-block me-2">{{ post.category }}</b-badge>
          </div>
        </div>
        <div class="text-center mt-2 p-2">
          <router-link class="text-decoration-none"
                       :to="{ name: `${PostRouteName}`, params: { postIdx: post.postIdx } }">

            <div style="display: flex; justify-content: center; align-items: center; height: 150px; width: 100%;">
              <div style="width: 150px;">
                <div>
                  <b-img
                      v-if="post.thumbnailSavedAttachmentName"
                      :src="`${bucketPath}${post.thumbnailSavedAttachmentName}`"
                      fluid
                  ></b-img>
                  <b-img
                      v-else
                      fluid
                  ></b-img>
                </div>
              </div>
            </div>

            <b-card-text class="text-dark fw-bold text-truncate">
              {{ post.title }}
            </b-card-text>
          </router-link>
          <hr>
          <div class="text-truncate-2-lines">
            {{ post.content }}
          </div>
          <div class="text-sm mt-1">{{ useGetTimeDifference(post.regDate) }} &middot;
            <b-link class="text-black text-decoration-none" href="#" v-if="post.memberNickname">{{
                post.memberNickname
              }}
            </b-link>
            <b-link class="text-black text-decoration-none" v-if="post.managerNickname">{{
                post.managerNickname
              }}
            </b-link>
          </div>

          <b-row class="text-center mt-3">
            <b-col class="p-0"><i class="bi bi-emoji-smile"></i> 1</b-col>
            <b-col class="p-0"><i class="bi bi-chat-square-text"></i> 1</b-col>
            <b-col class="p-0"><i class="bi bi-hand-index-thumb"></i> 1</b-col>
          </b-row>

        </div>
      </b-card>
    </b-col>
  </template>
  <template v-else>
    <CommonMessage
        :imagePath="`emptyList.png`"
        :title="`게시글이 없어요`"
        :content="`새로운 게시글을 작성하거나 검색어를 확인해 주세요.`"
    />
  </template>
</template>

<style scoped>

.text-truncate-2-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 원하는 줄 수로 변경 가능 */
  -webkit-box-orient: vertical;
}

.card-hover:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

</style>
