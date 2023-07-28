<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imagePath="`service-not-available.png`"
                 :title="`Service is currently under maintenance.`"
                 :content="`죄송합니다. 현재 서비스가 준비 중이거나 예상치 못한 오류가 발생했습니다`"/>
</template>