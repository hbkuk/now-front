<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imagePath="`error.png`"
                 :title="`Forbidden`"
                 :content="`죄송합니다. 잘못된 경로로 접근하셨습니다`"/>
</template>