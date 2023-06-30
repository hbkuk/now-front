<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostForm from "@/components/PostForm.vue";

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <b-container>
      <PostForm/>
    </b-container>
</template>