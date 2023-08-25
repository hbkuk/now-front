<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import Post from "@/components/Post.vue";
import Carousel from "@/components/Carousel.vue";

const slides = [
  {
    src: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
    alt: 'Wild Landscape'
  },
  {
    src: 'https://mdbcdn.b-cdn.net/img/new/slides/042.webp',
    alt: 'Camera'
  },
  {
    src: 'https://mdbcdn.b-cdn.net/img/new/slides/043.webp',
    alt: 'Exotic Fruits'
  }
]

</script>

<template>
  <BackgroundBanner :title="`Photo`" :bannerPath="`community.png`"/>

  <b-container class="mt-3">
    <Post>
      <Carousel :slides="slides"/>
    </Post>
  </b-container>

</template>
