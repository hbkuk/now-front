<script setup>
import {defineProps} from "vue";

const props = defineProps({
  error: Object,
});
</script>

<template>
  <b-list-group class="mb-3">
    <b-list-group-item class="text-center" variant="danger"><b>{{ error.message }}</b></b-list-group-item>
  </b-list-group>
</template>
