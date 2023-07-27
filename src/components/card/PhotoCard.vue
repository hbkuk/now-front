<script setup>
import {defineProps} from "vue";
import {useIsNewPost} from "@/composable/date/isNewPost";
import {useGetTimeDifference} from "../../composable/date/getTimeDifference";

const props = defineProps({
  posts: Object,
  PostRouteName: String,
});

</script>

<template>
  <b-col v-for="(post, index) in posts" :key="index" class="mt-5 mb-3" cols="3">
    <b-card class="h-100 card-hover">
      <div>
        <div class="text-center">
          <b-badge pill variant="warning me-2" v-if="useIsNewPost(post.regDate)">NEW</b-badge>
          <b-badge pill variant="primary" class="d-inline-block me-2">{{ post.category }}</b-badge>
        </div>
      </div>
      <div class="text-center mt-2 p-2">
        <router-link class="text-decoration-none" :to="{ name: `${PostRouteName}`, params: { postIdx: post.postIdx } }">">
          <b-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRn_xsMTOHm_yD30lIt0MZwvggJS2BPPhuLg&usqp=CAU"
              fluid
              alt="Google Logo"
              aspect-ratio="1/1"
          ></b-img>
          <b-card-text class="text-dark fw-bold text-truncate">
            {{ post.title }}
          </b-card-text>
        </router-link>
        <hr>
        <div class="text-truncate-2-lines">
          {{ post.content }}
        </div>
        <div class="text-sm mt-1">{{ useGetTimeDifference(post.regDate) }} &middot;
          <b-link class="text-black text-decoration-none" href="#" v-if="post.memberNickname" >{{ post.memberNickname }}</b-link>
          <b-link class="text-black text-decoration-none" v-if="post.managerNickname" >{{ post.managerNickname }}</b-link>
        </div>

        <b-row class="text-center mt-3">
          <b-col class="p-0"> <i class="bi bi-emoji-smile"></i> 1</b-col>
          <b-col class="p-0"> <i class="bi bi-chat-square-text"></i> 1</b-col>
          <b-col class="p-0"> <i class="bi bi-hand-index-thumb"></i> 1</b-col>
        </b-row>

      </div>
    </b-card>
  </b-col>
</template>

<style scoped>

.text-truncate-2-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 원하는 줄 수로 변경 가능 */
  -webkit-box-orient: vertical;
}

.card-hover:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

</style>
