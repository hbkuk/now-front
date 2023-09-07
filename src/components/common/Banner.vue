<script setup>

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const props = defineProps({
  imageName: String,
  routerName: String
})
</script>

<template>
  <router-link :to="{ name: routerName }" class="router-link">
    <div class="bg-white py-1 mb-3">
      <b-img center
             class="img-fluid rounded mx-auto d-block w-100"
             :src="`${bucketPath}${imagesDirectoryName}${imageName}`"
             alt="Main image"/>
    </div>
  </router-link>
</template>
