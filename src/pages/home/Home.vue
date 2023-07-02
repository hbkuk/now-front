<script setup>
import Banner from "@/components/common/Banner.vue";
import Table from "@/components/table/Table.vue";
import ThumbnailTable from "@/components/table/ThumbnailTable.vue";
</script>

<template>
  <Banner :bannerPath="`main.png`"/>

  <b-container class="mt-3">
    <b-row>
      <b-col lg="6" class="mb-3">
        <Banner :banner-path="`공지사항.png`"/>
        <Table v-for="idx in 5" :key="idx"/>
      </b-col>

      <b-col lg="6" class="mb-3">
        <Banner :banner-path="`커뮤니티.png`"/>
        <Table v-for="idx in 5" :key="idx"/>
      </b-col>

      <b-col lg="6" class="mb-3">
        <Banner :banner-path="`사진.png`"/>
        <ThumbnailTable v-for="idx in 5" :key="idx"/>
      </b-col>

      <b-col lg="6" class="mb-3">
        <Banner :banner-path="`문의.png`"/>
        <Table v-for="idx in 5" :key="idx"/>
      </b-col>
    </b-row>
  </b-container>
</template>

