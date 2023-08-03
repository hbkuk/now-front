<script setup>
import {defineProps} from "vue";
import {useGetIconTagByExtension} from "@/composable/attachment/getIconTagByExtension";
import {useFormatBytes} from "../composable/attachment/formatBytes";

const props = defineProps({
  attachments: Array,
});
</script>
<template>
    <ul class="list-group list-group-light">
        <li v-for="(attachment, attachmentIdx) in attachments" :key="attachmentIdx" class="list-group-item list-group-item-action px-3 border-0 ripple">
          <span v-if="attachment.attachmentExtension" v-html="useGetIconTagByExtension(attachment.attachmentExtension)"></span>&nbsp;
        <a :href="`/attachments/${attachment.attachmentIdx}`" class="text-decoration-none text-dark">{{ attachment.originalAttachmentName }} ({{ useFormatBytes(attachment.attachmentSize) }})</a>
    </li>
    </ul>
</template>