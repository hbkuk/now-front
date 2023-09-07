<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imageName="`error.png`"
                 :title="`Forbidden`"
                 :content="`죄송합니다. 이 페이지에 접근할 권한이 없습니다`"/>
</template>