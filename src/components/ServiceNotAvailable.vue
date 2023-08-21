<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imagePath="`error.png`"
                 :title="`Service Not available`"
                 :content="`죄송합니다. 현재 서비스가 준비 중입니다.`"/>
</template>