<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import CommunityForm from "@/pages/Community/component/CommunityPostForm.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PhotoPostForm from "@/pages/Photo/component/PhotoPostForm.vue";

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <PhotoPostForm />
</template>