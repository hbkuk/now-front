<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Category from "@/components/common/Category.vue";
import Table from "@/components/table/Table.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchForm from "@/components/common/SearchForm.vue";
</script>
<template>
  <BackgroundBanner :bannerPath="`community.png`"/>

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