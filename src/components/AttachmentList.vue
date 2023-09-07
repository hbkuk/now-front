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

      <div class="text-container-wrap">
        <b-button variant="outline-light"
                  @click="fileDownload(attachment.attachmentIdx, attachment.originalAttachmentName)"
                  class="text-decoration-none text-dark text-start">
          <span v-if="attachment.attachmentExtension"
                v-dompurify-html="useGetIconTagByExtension(attachment.attachmentExtension)">
          </span>
          {{ attachment.originalAttachmentName }} ({{ useFormatBytes(attachment.attachmentSize) }})
        </b-button>

      </div>
    </li>
  </ul>
</template>