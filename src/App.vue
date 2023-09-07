<script setup>
import Header from "@/components/static/Header.vue";
import Footer from "@/components/static/Footer.vue";
import SignInModal from "@/components/common/SignInModal.vue";
import DuplicateRequestingAlert from "@/components/common/DuplicateRequestingAlert.vue";
import Report from "@/components/common/Report.vue";
import WelcomeModal from "@/components/common/WelcomeModal.vue";
import Overlay from "@/components/common/Overlay.vue";
</script>

<template>
  <Header/>
  <Overlay >
    <RouterView/>
  </Overlay>
  <Footer/>
  <SignInModal/>
  <DuplicateRequestingAlert/>
  <Report/>
  <WelcomeModal/>
</template>

