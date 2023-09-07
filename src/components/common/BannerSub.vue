<script setup>

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const props = defineProps({
  imageName: String,
})
</script>

<template>
  <div class="bg-white py-1">
    <b-img center
           :src="`${bucketPath}${imagesDirectoryName}${imageName}`"
           alt="Main image"
           class="img-fluid rounded mx-auto d-block" style="max-height: 235px;" />
  </div>
</template>

