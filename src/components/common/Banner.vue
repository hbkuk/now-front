<script setup>

const props = defineProps({
  bannerPath: String,
  routerName: String
})
</script>

<template>
  <router-link :to="{ name: routerName }" class="router-link">
    <div class="bg-white py-1 mb-3">
      <b-img center class="img-fluid rounded mx-auto d-block w-100" :src="require(`@/resources/banner/${bannerPath}`)"
             alt="Main image"/>
    </div>
  </router-link>
</template>
