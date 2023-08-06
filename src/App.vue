<script setup>
import Header from "@/components/static/Header.vue";
import Footer from "@/components/static/Footer.vue";
</script>

<template>
  <Header />
  <RouterView/>
  <Footer/>
</template>

<style>
/* 스크롤바 항상 보이도록 설정 */
body {
  overflow: scroll;
}
</style>