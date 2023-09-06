<script setup>
import { defineProps } from "vue";

const props = defineProps({
  currentCharacterCount: {
    type: Number,
    default: 0,
    required: false
  },
  maxCharacterCount: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <b-row class="justify-content-end">
    <b-col md="auto">
      <div class="text-end">
        <b-badge variant="light">
          <small class="text-light-emphasis">
            {{ currentCharacterCount }} / {{ maxCharacterCount }}
          </small>
        </b-badge>
      </div>
    </b-col>
  </b-row>
</template>
