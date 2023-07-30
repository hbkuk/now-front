<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import NoticePostForm from "@/pages/Notice/component/NoticePostForm.vue";

// TODO: 서버측에 권한 검사
</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <NoticePostForm />
</template>