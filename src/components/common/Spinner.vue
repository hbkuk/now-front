<script setup>
import {defineProps} from "vue";

const props = defineProps({
  msg: String,
});
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">{{ msg }}</span>
    </div>
  </div>
</template>