<script setup>
import PhotoCard from "@/components/card/PhotoCard.vue";
import SearchForm from "@/components/common/SearchForm.vue";
import Category from "@/components/common/Category.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
</script>
<template>
  <BackgroundBanner :title="`Photo`" :bannerPath="`community.png`"/>

  <b-container class="mt-3">
    <b-row>
      <b-col class="3">
        <searchForm/>
        <Category/>
        <b-row>
          <b-col class="mt-5 mb-3" cols="3" v-for="idx in 8" :key="idx">
            <PhotoCard/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </b-container>
</template>