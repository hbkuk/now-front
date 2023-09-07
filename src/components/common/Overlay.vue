<script setup>
import {store} from "@/store";
</script>
<template>
  <b-overlay
      :show="store.isCurrentRequesting"
      spinner-variant="primary"
      spinner-type="grow"
  >
    <slot></slot>
  </b-overlay>
</template>