<script setup>
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>
<template>
  <CommonMessage :imageName="`error.png`"
                 :title="`Too many write requests`"
                 :content="`일정 시간 동안 많은 요청을 하셨습니다. 잠시 후 다시 시도해 주세요.`"/>
</template>