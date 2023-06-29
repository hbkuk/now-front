<template>
  <b-row class="mb-2">
    <b-col cols="3" class="d-flex justify-content-start">
      <b-form-input class="currentDate text-center me-3" type="date" placeholder="시작 날짜"></b-form-input>
      <b-form-input class="endDate text-center" type="date" placeholder="끝 날짜"></b-form-input>
    </b-col>
    <b-col cols="9" class="d-flex justify-content-end">
      <b-form-input type="text" placeholder="게시글 검색" class="me-2" style="max-width: 300px;"></b-form-input>
      <b-button variant="primary" size="sm" class="text-nowrap me-1" >검색</b-button>
      <b-button variant="danger" size="sm" class="text-nowrap">검색 초기화</b-button>
    </b-col>
  </b-row>
</template>
<script setup>
</script>