<script setup>
import {store} from "@/store";
</script>

<template>
  <b-alert
      v-model="store.isDuplicateRequesting"
      class="position-fixed fixed-bottom m-0 rounded-0 text-center"
      style="z-index: 2000;"
      variant="success"
      dismissible
  >
    <h4><b>이전과 동일한 요청입니다. 잠시후 다시 시도해주세요.</b></h4>
  </b-alert>
</template>