<script setup>
import Header from "@/components/static/Header.vue";
import Footer from "@/components/static/Footer.vue";
import CategoryService from "@/service/CategoryService";
import {store} from "@/store";
import SignInModal from "@/components/common/SignInModal.vue";

/**
 * 카테고리 데이터를 가져와 sessionStorage 저장
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 sessionStorage 저장 후 완료
 */
async function getCategories() {
  return CategoryService.fetchCategories().then(response => {
    store.categories = response.data;
    sessionStorage.setItem("categories", JSON.stringify(response.data));
  }).catch(error => {
    console.log(error)
  })
}

getCategories();

</script>

<template>
  <Header />
  <RouterView/>
  <Footer/>

  <SignInModal/>
</template>