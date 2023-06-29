<script setup>
import {ref} from "vue";

const rows = ref(100);
const currentPage = ref(1);
</script>

<template>
    <div className="mt-5">
      <b-pagination size="lg" align="center" v-model="currentPage" pills :total-rows="rows" />
    </div>
</template>