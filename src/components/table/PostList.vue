<script setup>
import {defineProps} from "vue";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useIsNewPost} from "@/composable/date/isNewPost";
import {useGetTimeDifference} from "../../composable/date/getTimeDifference";
import {useFormatNumber} from "../../composable/number/formatNumber";

const props = defineProps({
  posts: Object,
  PostRouteName: String,
});

</script>

<template>
  <div v-for="(post, index) in posts" :key="index" class="card rounded-2 row-hover pos-relative pb-2 px-3 mb-1 border-0 rounded-0 border-bottom border-secondary card-hover">
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
                <router-link class="text-decoration-none text-dark font-weight-bold" :to="{ name: `${PostRouteName}`, params: { postIdx: post.postIdx } }">
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
          <b-list-group class="border-0">
            <b-list-group-item class="d-flex justify-content-md-around align-items-center border-0 py-sm-1">
              <i class="bi bi-emoji-smile me-1"></i>
              <b-badge pill variant="secondary"><span>{{ useFormatNumber(post.likeCount - post.dislikeCount) }}</span></b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-md-around align-items-center border-0 py-sm-1">
              <i class="bi bi-chat-square-text me-1"></i>
              <b-badge pill variant="secondary"><span v-if="post.comments">{{ useFormatNumber(post.comments.length) }}</span></b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-md-around align-items-center border-0 py-sm-1">
              <i class="bi bi-hand-index-thumb me-1"></i>
              <b-badge pill variant="secondary"><span>{{ useFormatNumber(post.viewCount) }}</span></b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-col>


      </b-row>
    </template>
  </div>
</template>
<style scoped>
.card-hover:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>