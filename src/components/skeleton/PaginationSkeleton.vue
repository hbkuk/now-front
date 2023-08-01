<template>
  <b-container class="mt-3">
    <b-skeleton height="3rem" width="100%"></b-skeleton>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';

const boxWidth = ref('2rem');
const boxHeight = ref('2.5rem');
</script>
