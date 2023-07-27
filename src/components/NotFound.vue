<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imagePath="`not-found.png`"
                 :title="`This page does not exist.`"
                 :content="`죄송합니다. 찾으시려는 페이지는 존재하지 않습니다.`"/>
</template>