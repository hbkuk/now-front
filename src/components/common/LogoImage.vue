<script setup>

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const props = defineProps({
  imageName: String
})
</script>

<template>
  <b-img center
         style="height: 70px"
         class="img-fluid rounded d-block"
         :src="`${bucketPath}${imagesDirectoryName}${imageName}`"
         alt="Main image"/>
</template>
