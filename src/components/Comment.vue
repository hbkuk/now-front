<template>
  <div class="form-outline mb-2">
    <b-form-textarea class="form-control mt-2" rows="5" id="comment" name="text" placeholder="댓글 입력 ..."></b-form-textarea>
  </div>
  <div class="mb-4 text-end">
    <b-button variant="primary" size="sm">댓글 등록</b-button>
  </div>

  <div class="comment-list">
    <div class="card mb-4 card-comment">
      <div class="card-body">
        <p>{{ "댓글 내용" }}</p>

        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small mb-0 ms-2">{{ "글쓰니" }}</p>
          </div>
          <div class="d-flex flex-row align-items-center">
            <i class="bi bi-chevron-up mx-2"></i>
            <p class="small text-muted mb-0">3</p>
            <i class="ms-2 bi-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>