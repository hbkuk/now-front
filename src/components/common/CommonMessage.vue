<script setup>

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const props = defineProps({
  imageName: String,
  title: String,
  content: String
})

</script>
<template>

  <div class="not-found">
    <div class="mb-lg-5">
      <b-img :src="`${bucketPath}${imagesDirectoryName}${imageName}`"
             fluid
             alt="Responsive image"
             width="450"
             height="50">
      </b-img>
    </div>
    <div class="status emphasis">
      {{ title }}
    </div>
    <div class="message">
      {{ content }}
    </div>
  </div>
</template>

<style scoped>

.emphasis {
  font-weight: bold;
  text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
}

.not-found {
  line-height: 1.5;
  text-align: center;
  padding: 60px 20px;
}

.not-found .status {
  font-size: 40px;
  color: $primary;
}

.not-found .message {
  font-size: 20px;
}

</style>
<script setup>
</script>