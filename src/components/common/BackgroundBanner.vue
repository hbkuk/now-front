<script setup>
const props = defineProps({
  title: String,
  content: String,
  bannerPath: String
})
</script>
<template>
  <div class="bg-primary text-white bg-opacity-50 py-1 text-left" :style="{ backgroundImage: `url(${require(`@/resources/banner/${bannerPath}`)})`, height: '20vh' }">
    <b-container class="mt-3">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </b-container>
  </div>
</template>