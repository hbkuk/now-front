<script setup>
import {defineProps} from "vue";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";

const props = defineProps({
  post: Object,
});
</script>

<template>
  <b-container>
    <article>
      <div class="post-content">
        <h3 class="mb-lg-3">
          <b-badge href="#" variant="primary">Answer</b-badge>
        </h3>
        <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li v-if="post.answerManagerNickname" class="breadcrumb-item text-secondary">{{ post.answerManagerNickname }}</li>
            <li v-if="post.answerRegDate" class="breadcrumb-item text-secondary">{{ useGetTimeDifference(post.answerRegDate) }}</li>
          </ol>
        </nav>

        <p class="mt-5 mb-lg-5">{{ post.answerContent }}</p>
      </div>
    </article>
    <hr class="mb-5"/>
  </b-container>
</template>