<script setup>
import {defineProps} from "vue";
import {useGetPostViewRouteBaseURL} from "@/composable/router/getPostViewRoute";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useIsNewPost} from "@/composable/date/isNewPost";
import {useGetTimeDifference} from "../../composable/date/getTimeDifference";

const props = defineProps({
  posts: Object,
});

</script>

<template>
  <div v-for="(post, index) in posts" :key="index" class="card row-hover pos-relative pb-2 px-3 mb-1 border-0 rounded-0 border-bottom border-secondary">
    <template v-if="posts !== null">
      <b-row>
        <b-col md="10" class="d-flex justify-content-center">
          <b-row class="text-center w-100 float-end align-items-center flex-column">
            <b-col class="p-0 d-flex align-items-center">
              <b-badge pill variant="warning me-2" v-if="useIsNewPost(post.regDate)">NEW</b-badge>
              <b-badge pill variant="primary" class="d-inline-block me-2">{{ useCapitalizeFirstLetter(post.category) }}</b-badge>
              <b-badge pill variant="success me-2" v-if="post.answerManagerNickname">Answer</b-badge>
              <b-badge pill variant="secondary" v-if="post.secret">Secret</b-badge>
            </b-col>
            <b-col class="p-0 d-flex align-items-center">
              <b>
                <router-link class="text-decoration-none text-dark font-weight-bold" :to="useGetPostViewRouteBaseURL(post.postGroup) + `${post.postIdx}`">
                  {{  post.title }}
                </router-link>
              </b>
            </b-col>
            <b-col class="p-0 d-flex align-items-center">
              <div class="text-sm">{{ useGetTimeDifference(post.regDate) }} &middot;
                <b-link class="text-black text-decoration-none" href="#" v-if="post.memberNickname" >{{ post.memberNickname }}</b-link>
                <b-link class="text-black text-decoration-none" v-if="post.managerNickname" >{{ post.managerNickname }}</b-link>
              </div>
            </b-col>

          </b-row>
        </b-col>

        <b-col md="2">
          <b-row class="text-center float-end align-items-center flex-column">
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <i class="bi bi-emoji-smile me-1"></i>
              <span>{{ post.likeCount - post.dislikeCount }}</span>
            </b-col>
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <i class="bi bi-chat-square-text me-1"></i>
              <span v-if="post.comments">{{ post.comments.length }}</span>
            </b-col>
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <i class="bi bi-hand-index-thumb me-1"></i>
              <span>{{ post.viewCount }}</span>
            </b-col>
          </b-row>
        </b-col>

      </b-row>
    </template>
  </div>
</template>
<script setup>
</script>