<script setup>
import Header from "@/components/static/Header.vue";
import Footer from "@/components/static/Footer.vue";
import CategoryService from "@/service/CategoryService";

/**
 * 카테고리 데이터를 가져와 sessionStorage 저장
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 sessionStorage 저장 후 완료
 */
async function getCategories() {
  return CategoryService.fetchCategories().then(response => {
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
</template>

<style>
/* 스크롤바 항상 보이도록 설정 */
body {
  overflow: scroll;
}

/* nav, list 에서 선택된 item */
.selected {
  font-weight: bold;
  color: #1E90FF; /* 파란색 */
  text-shadow: 1px 1px 2px rgba(77, 148, 255, 3); /* 그림자 */
}

</style>