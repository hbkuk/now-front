<script setup>
import {defineProps} from "vue";
import {useGetIconTagByExtension} from "@/composable/attachment/getIconTagByExtension";
import {useFormatBytes} from "@/composable/attachment/formatBytes";
import AttachmentService from "@/service/AttachmentService";
import {useCreateDownloadLink} from "@/composable/attachment/useCreateDownloadLink";

const props = defineProps({
  attachments: Array,
});

function fileDownload(attachmentIdx, originalAttachmentName) {
  AttachmentService.downloadFile(attachmentIdx)
      .then(response => {
        useCreateDownloadLink(new Blob([response.data]), originalAttachmentName);
      })
      .catch(error => {
        console.error('파일 다운로드 실패:', error);
      });
}
</script>
<template>
  <ul class="list-group list-group-light">
    <li v-for="(attachment, attachmentIdx) in attachments" :key="attachmentIdx"
        class="list-group-item list-group-item-action px-3 border-0 ripple">
      <span v-if="attachment.attachmentExtension"
            v-html="useGetIconTagByExtension(attachment.attachmentExtension)"></span>&nbsp;
      <b-button variant="outline-light"
                @click="fileDownload(attachment.attachmentIdx, attachment.originalAttachmentName)"
                class="text-decoration-none text-dark">{{ attachment.originalAttachmentName }}
        ({{ useFormatBytes(attachment.attachmentSize) }})
      </b-button>
    </li>
  </ul>
</template>