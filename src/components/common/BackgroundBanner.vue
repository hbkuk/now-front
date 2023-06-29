<script setup>
const props = defineProps({
  bannerPath: String
})
</script>
<template>
  <div class="bg-primary text-white bg-opacity-50 py-1 text-left" :style="{ backgroundImage: `url(${require(`@/resources/banner/${bannerPath}`)})`, height: '20vh' }">
    <b-container class="mt-3">
      <h2>Q&A</h2>
      <p>좋은 질문과 답변으로 동료의 시간을 아껴주세요.</p>
    </b-container>
  </div>
</template>