<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imageName="`error.png`"
                 :title="`Server Error`"
                 :content="`죄송합니다. 예상치 못한 에러가 발생했습니다.`"/>
</template>