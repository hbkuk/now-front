<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Category from "@/components/common/Category.vue";
import Table from "@/components/table/PostTable.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
</script>
<template>
  <BackgroundBanner
    :title="`Community`"
    :content="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"
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