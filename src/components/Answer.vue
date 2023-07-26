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
    <div class="row">
      <!-- 왼쪽 공백을 둘 컬럼 -->
      <div class="col-md-1 d-flex align-items-center fs-2">
        <i class="bi bi-arrow-return-right bi-3x"></i>
      </div>

      <!-- 오른쪽 컬럼 -->
      <div class="col-md-11">
        <article>
          <div class="post-content">
            <h3 class="mb-lg-3">
              <b-badge href="#" variant="primary">Answer</b-badge>
            </h3>
            <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li v-if="post.answerManagerNickname" class="breadcrumb-item text-secondary">{{ post.answerManagerNickname }}</li>
                <li class="breadcrumb-item text-secondary">{{ useGetTimeDifference(post.regDate) }}</li>
              </ol>
            </nav>

            <p class="mt-5 mb-lg-5">{{ post.answerContent }}</p>
          </div>
        </article>
      </div>
    </div>
  </b-container>



  <hr class="mb-5"/>
</template>