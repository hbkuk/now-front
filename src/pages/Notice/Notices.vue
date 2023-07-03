<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Category from "@/components/common/Category.vue";
import Table from "@/components/table/PostTable.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
</script>
<template>
  <BackgroundBanner
    :title="`Notice`"
    :content="`NOW의 새소식, 이벤트, 행사 정보를 공유하는 공간입니다.`"
    :banner-path="`community.png`"
  />

  <b-container class="mt-3">
    <b-row>
      <!-- Main content -->
      <b-col class="3">
        <searchForm/>
        <Category/>
        <Table v-for="idx in 10" :key="idx"/>
        <Pagination/>
      </b-col>
    </b-row>
  </b-container>
</template>