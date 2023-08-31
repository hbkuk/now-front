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
    <h4><b>동일한 요청을 반복할 경우 예고없이 차단될 수 있습니다. 잠시후 다시 시도해주세요.</b></h4>
  </b-alert>
</template>