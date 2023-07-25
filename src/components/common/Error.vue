<script setup>
import {defineProps} from "vue";

const props = defineProps({
  error: Object,
});
</script>

<template>
  <div class="container">
    <b-list-group>
      <b-list-group-item class="text-center" variant="danger" v-for="item in error.detail.split('&')" :key="item">{{ item }}</b-list-group-item>
    </b-list-group>
  </div>
</template>
