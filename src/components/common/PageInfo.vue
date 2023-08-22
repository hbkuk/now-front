<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  page: Object,
});

</script>

<template>
  <b-row class="justify-content-end my-2">
    <b-col md="auto">
      <div class="text-end">
        <b-button variant="secondary">
          <span>페이지</span>&nbsp;&nbsp;
          <b-badge variant="light"> {{page.pageNo}} / {{page.maxPage}} </b-badge>
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>