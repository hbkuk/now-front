<script setup>

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const props = defineProps({
  title: String,
  content: String,
  imageName: String
})
</script>
<template>
  <div class="bg-primary text-white bg-opacity-50 py-1 text-left"
       :style="{ backgroundImage: `url(${bucketPath}${imagesDirectoryName}${imageName}})`, height: '20vh' }">
    <b-container class="mt-3">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </b-container>
  </div>
</template>