<script setup>
import Banner from "@/components/common/Banner.vue";
import PostTable from "@/components/table/PostTable.vue";
import ThumbnailTable from "@/components/table/ThumbnailTable.vue";
</script>

<template>
  <Banner
    :router-name="`Home`"
    :banner-path="`main.png`"
  />

  <b-container class="mt-3">
    <b-row>
      <b-col
        lg="6"
        class="mb-3"
      >
        <Banner
          :router-name="`Notices`"
          :banner-path="`공지사항.png`"
        />
        <PostTable
          v-for="idx in 5"
          :key="idx"
        />
      </b-col>

      <b-col
        lg="6"
        class="mb-3"
      >
        <Banner
          :router-name="`Community`"
          :banner-path="`커뮤니티.png`"
        />
        <PostTable
          v-for="idx in 5"
          :key="idx"
        />
      </b-col>

      <b-col
        lg="6"
        class="mb-3"
      >
        <Banner
          :router-name="`Photos`"
          :banner-path="`사진.png`" />
        <ThumbnailTable
          v-for="idx in 5"
          :key="idx"
        />
      </b-col>

      <b-col
        lg="6"
        class="mb-3"
      >
        <Banner
          :router-name="`Inquiries`"
          :banner-path="`문의.png`" />
        <PostTable
          v-for="idx in 5"
          :key="idx"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

