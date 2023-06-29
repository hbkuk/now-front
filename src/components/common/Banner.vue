<script setup>

const props = defineProps({
  bannerPath: String
})
</script>

<template>
  <div class="bg-white py-1">
    <b-img center class="img-fluid rounded mx-auto d-block w-100" :src="require(`@/resources/banner/${bannerPath}`)"
           alt="Main image"/>
  </div>
</template>
