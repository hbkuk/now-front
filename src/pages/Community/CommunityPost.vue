<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Comment from "@/components/Comment.vue";
</script>

<template>
  <BackgroundBanner :title="`Photo`" :bannerPath="`community.png`"/>

  <b-container class="mt-3">
    <Post/>
    <Comment/>
  </b-container>
</template>