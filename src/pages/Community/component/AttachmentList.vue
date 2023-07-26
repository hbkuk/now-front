<script setup>
import {defineProps} from "vue";

const props = defineProps({
  attachments: Array,
});
</script>
<template>
    <ul class="list-group list-group-light">
        <li v-for="(attachment, attachmentIdx) in attachments" :key="attachmentIdx" class="list-group-item list-group-item-action px-3 border-0 ripple">
        <a :href="`/download/${attachment.attachmentIdx}`" class="text-decoration-none text-dark">{{ attachment.originalAttachmentName }} ({{ attachment.attachmentSize }})</a>
    </li>
    </ul>
</template>