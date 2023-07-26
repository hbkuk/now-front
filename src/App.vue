<script setup>
import Header from "@/components/static/Header.vue";
import Footer from "@/components/static/Footer.vue";
import DataService from "@/service/DataService";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";

/**
 * 카테고리 데이터를 가져와 sessionStorage 저장
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 sessionStorage 저장 후 완료
 */
async function getCategories() {
  const [response] = await Promise.all([DataService.fetchCategories()]);
  if(response.status === RequestSuccessCode.GET) {
    sessionStorage.setItem("categories", JSON.stringify(response.data));
  }
}

getCategories()

</script>

<template>
  <Header />
  <RouterView/>
  <Footer/>
</template>