<script setup>
import {defineProps} from "vue";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useIsNewPost} from "@/composable/date/isNewPost";
import {useGetTimeDifference} from "../../composable/date/getTimeDifference";
import {useFormatNumber} from "../../composable/number/formatNumber";

const props = defineProps({
  posts: Object,
  postRouteName: String,
});

</script>

<template>
  <template v-if="posts !== null">
    <div v-for="(post, index) in posts" :key="index"
         class="rounded-2 row-hover pos-relative mb-2 px-3 mb-1 border-0 rounded-0 border-bottom border-secondary card-hover"
         :class="{ 'pinned-card': post.pinned }">

      <table class="h-100 table table-borderless">

        <tr>

          <td colspan="8">
            <div class="d-flex justify-content-start pt-2 pe-2 flex-column gap-2">
              <div class="float-end align-items-center">
                <b-badge pill variant="danger me-2" v-if="post.pinned">중요</b-badge>
                <b-badge pill variant="warning me-2" v-if="useIsNewPost(post.regDate)">NEW</b-badge>
                <b-badge pill variant="secondary" class="d-inline-block me-2">
                  {{ useCapitalizeFirstLetter(post.category) }}
                </b-badge>
                <b-badge pill variant="success me-2" v-if="post.answerManagerNickname">Answer</b-badge>
                <b-badge pill variant="danger" v-if="post.secret">Secret</b-badge>
              </div>
              <div class="p-0 d-flex align-items-center">
                <b>
                  <router-link class="text-decoration-none text-dark font-weight-bold"
                               :to="{ name: `${postRouteName}`, params: { postIdx: post.postIdx } }">
                    {{ post.title }}
                  </router-link>
                </b>
              </div>
              <div class="p-0 d-flex align-items-center">
                <div class="text-sm">{{ useGetTimeDifference(post.regDate) }} &middot;
                  <b-link class="text-black text-decoration-none" href="#" v-if="post.memberNickname">
                    {{ post.memberNickname }}
                  </b-link>
                  <b-link class="text-black text-decoration-none" v-if="post.managerNickname">{{ post.managerNickname }}</b-link>
                </div>
              </div>
            </div>
          </td>

          <td colspan="2" class="float-end">
            <tr>
              <td>
                <b-list-group class="border-0">
                  <b-list-group-item class="d-flex justify-content-center align-items-center border-0 py-sm-1">
                    <i class="bi bi-emoji-smile me-1"></i>
                    <b-badge pill variant="secondary"><span>{{
                        useFormatNumber(post.likeCount - post.dislikeCount)
                      }}</span></b-badge>
                  </b-list-group-item>
                </b-list-group>
              </td>
            </tr>
            <tr>
              <td>
                <b-list-group class="border-0">
                  <b-list-group-item class="d-flex justify-content-center align-items-center border-0 py-sm-1">
                    <i class="bi bi-chat-square-text me-1"></i>
                    <b-badge pill variant="secondary"><span
                        v-if="post.comments">{{ useFormatNumber(post.comments.length) }}</span></b-badge>
                  </b-list-group-item>
                </b-list-group>
              </td>
            </tr>
            <tr>
              <td>
                <b-list-group class="border-0">
                  <b-list-group-item class="d-flex justify-content-center align-items-center border-0 py-sm-1">
                    <i class="bi bi-hand-index-thumb me-1"></i>
                    <b-badge pill variant="secondary"><span>{{ useFormatNumber(post.viewCount) }}</span></b-badge>
                  </b-list-group-item>
                </b-list-group>
              </td>
            </tr>
          </td>

        </tr>
      </table>

    </div>
  </template>
</template>
<style scoped>
.card-hover {
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.4s ease; /* box-shadow 변화를 0.3초 동안 부드럽게 만듦 */
}

.card-hover:hover {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5); /* 기본 그림자 효과 */
}

.pinned-card {
  box-shadow: 0 5px 5px rgba(51, 153, 255, 1);
}
.pinned-card:hover {
  box-shadow: 0 5px 10px rgba(51, 170, 255, 1);
}
</style>