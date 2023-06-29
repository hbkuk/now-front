<template>
  <div class="card row-hover pos-relative pb-2 px-3 mb-1 border-0 rounded-0 border-bottom border-secondary">

    <b-row>

      <b-col md="10" class="d-flex justify-content-center">

        <b-row class="text-center w-100 float-end align-items-center flex-column">
          <b-col class="p-0 d-flex align-items-center">
            <b-badge pill variant="primary" class="d-inline-block me-2">지식</b-badge>
            <b-badge pill variant="warning me-2">NEW</b-badge>
            <b-badge pill variant="success me-2">답변완료</b-badge>
            <b-badge pill variant="secondary">비밀</b-badge>
          </b-col>
          <b-col class="p-0 d-flex align-items-center">
            <b-link href="#" class="text-decoration-none text-dark font-weight-bold">테스트 제목</b-link>
          </b-col>
          <b-col class="p-0 d-flex align-items-center">
            <div class="text-sm">몇 분 전 &middot; <b-link class="text-black text-decoration-none" href="#">작성자</b-link></div>
          </b-col>

        </b-row>
      </b-col>

      <b-col md="2">
        <b-row class="text-center w-100 float-end align-items-center flex-column">
          <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
            <i class="bi bi-emoji-smile me-1"></i>
            <span>10</span>
          </b-col>
          <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
            <i class="bi bi-chat-square-text me-1"></i>
            <span>1000</span>
          </b-col>
          <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
            <i class="bi bi-hand-index-thumb me-1"></i>
            <span>2000</span>
          </b-col>
        </b-row>
      </b-col>

    </b-row>
  </div>
</template>
<script setup>
</script>