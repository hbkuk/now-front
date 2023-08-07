<script setup>
import {computed, defineProps} from 'vue';

const emit = defineEmits(['changePageNo'])

const props = defineProps({
  page: Object,
});

/**
 * 필터링된 페이지 배열을 계산하는 컴퓨티드 속성
 * @type {ComputedRef<unknown[]>}
 */
const filteredPages = computed(() => {
  let startPage = props.page.startPage
  let endPage = props.page.endPage
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

/**
 * 페이지 번호 변경을 처리하는 메서드
 * @param {number|string} changePageNo - 변경할 페이지 번호 또는 'prev', 'next'
 */
const changePage = (changePageNo) => {
  if (changePageNo === 'prev') {
    emit('changePageNo', props.page.pageNo - 1)
  } else if (changePageNo === 'next') {
    emit('changePageNo', props.page.pageNo + 1)
  } else {
    emit('changePageNo', changePageNo)
  }
};

</script>

<template>
  <div class="pos-relative d-flex justify-content-center mt-5">
    <ul class="pagination pagination-sm">
      <li :class="['page-item', { 'disabled': page.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(1)">처음</a>
      </li>
      <li :class="['page-item', { 'disabled': page.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage('prev')">이전</a>
      </li>

      <li v-for="pageNumber in filteredPages" :class="['page-item', { 'active': pageNumber === page.pageNo }]" :key="pageNumber">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>


      <li :class="['page-item', { 'disabled': page.pageNo === page.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage('next')">다음</a>
      </li>
      <li :class="['page-item', { 'disabled': page.pageNo === page.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(page.maxPage)">끝</a>
      </li>
    </ul>
  </div>
</template>
