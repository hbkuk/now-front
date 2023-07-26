<script setup>
import {defineProps} from "vue";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";

const props = defineProps({
  post: Object,
});
</script>

<template>

  <div class="board bg-white text-dark py-1 text-left">
    <b-container class="mt-3">
      <div class="d-flex flex-row mt-3 mb-5">
        <b-button variant="secondary" size="sm" @click="$router.go(-1)">
          <i class="fa-solid fa-arrow-left"></i> 나가기
        </b-button>
      </div>
      <div class="hstack gap-3">
        <div class="vr"></div>
        <b>{{ useCapitalizeFirstLetter(post.category) }}</b>
      </div>
    </b-container>
  </div>

  <b-container class="py-3">
    <div class="row">
      <div class="col-md-12 mb-4">
        <article>
          <div class="post-content">
            <h2 class="title mb-4">{{ post.title }}</h2>

            <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li v-if="post.memberNickname" class="breadcrumb-item text-secondary">{{ post.memberNickname }}</li>
                <li v-if="post.managerNickname" class="breadcrumb-item text-secondary">{{ post.managerNickname }}</li>
                <li class="breadcrumb-item text-secondary">{{ useGetTimeDifference(post.regDate) }}</li>
                <li v-if="post.comments" class="breadcrumb-item text-secondary">댓글 {{ post.comments.length }}개</li>
              </ol>
            </nav>

            <slot></slot>

            <p class="mt-5 mb-lg-5">{{ post.content }}</p>

            <div class="d-flex justify-content-end align-items-center">
              <i class="btn bi bi-chevron-up mx-2 icon-1x"></i><p class="text-dark mb-0 h4">3</p><i class="btn ms-2 bi-chevron-down icon-1x"></i>
            </div>

            <hr class="my-2"/>
          </div>
        </article>
      </div>
    </div>
  </b-container>
</template>