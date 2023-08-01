<script setup>

const props = defineProps({
  bannerPath: String,
})
</script>

<template>
  <div class="bg-white py-1">
    <b-img center :src="require(`@/resources/banner/${bannerPath}`)"
           alt="Main image" class="img-fluid rounded mx-auto d-block" style="max-height: 235px;" />
  </div>
</template>

