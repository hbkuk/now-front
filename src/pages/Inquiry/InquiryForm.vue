<script setup>
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import CommunityForm from "@/pages/Community/component/CommunityPostForm.vue";
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import InquiryPostForm from "@/pages/Inquiry/component/InquiryPostForm.vue";

</script>
<template>
  <BackgroundBanner :title="`행복한 마음`" :bannerPath="`community.png`"/>
    <PostFormHeader />
    <InquiryPostForm />
</template>