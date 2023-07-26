<script setup>
import {defineProps} from "vue";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";

const props = defineProps({
  comments: Array,
});
</script>

<template>
  <div>
    <div class="form-outline mb-2">
      <b-form-textarea class="form-control p-3 mt-2" rows="5" id="comment" name="text" placeholder="댓글 입력 ..."></b-form-textarea>
    </div>
    <div class="mb-4 text-end">
      <b-button variant="primary" size="sm">댓글 등록</b-button>
    </div>

    <div class="comment-list">
      <div v-for="(comment, commetIdx) in comments" :key="commetIdx" class="card mb-4 card-comment">
        <div class="card-body">

          <div class="d-flex flex-row align-items-center">
            <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <i class="bi bi-person-circle pe-2"></i>
                <li v-if="comment.memberNickname" class="breadcrumb-item text-secondary">{{ comment.memberNickname }}</li>
                <li v-if="comment.managerrNickname" class="breadcrumb-item text-secondary">{{ comment.managerNickname }}</li>
                <li v-if="comment.regDate" class="breadcrumb-item text-secondary">{{ useGetTimeDifference(comment.regDate) }}</li>
              </ol>
            </nav>
          </div>

          <div class="d-flex justify-content-between mt-3">

            <p class="font-weight-normal text-center m-0">{{ comment.content }}</p>

            <div class="d-flex flex-row align-items-center">
              <i class="bi bi-chevron-up mx-2"></i>
              <p class="small text-muted mb-0">기능 준비중</p>
              <i class="ms-2 bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>