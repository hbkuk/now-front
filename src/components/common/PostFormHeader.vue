<script setup>

const props = defineProps({
  routeNameForPush: String
})
</script>

<template>
  <b-container>
    <b-row class="mt-3 mb-3">
      <b-col cols="auto">
        <b-button variant="secondary" size="sm" @click="$router.push({name:`${routeNameForPush}`})">
          <i class="fa-solid fa-arrow-left"></i> 목록 보기
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>