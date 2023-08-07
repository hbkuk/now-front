<script setup>
import {ref} from "vue";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";
import {MAX_NUMBER_OF_POSTS, SORT_OPTIONS} from "@/composable/param/constants/condition";

const emit = defineEmits(['search'])

const props = defineProps({
  condition: Object,
  categories: Object,
  postFormRouteName: String
})

const searchCondition = ref({
  startDate: props.condition.startDate,
  endDate: props.condition.endDate,
  category: props.condition.category,
  keyword: props.condition.keyword,
  pageNo: props.condition.pageNo,
  maxNumberOfPosts: props.condition.maxNumberOfPosts,
  sort: props.condition.sort
});

/**
 * 검색 조건을 초기화
 * @function
 * @returns {void}
 */
const cleanSearchCondition = () => {
  searchCondition.value.startDate = useGetPastDate(365);
  searchCondition.value.endDate = useGetCurrentDate;
  searchCondition.value.categoryIdx = null;
  searchCondition.value.keyword = null;
  searchCondition.value.pageNo = 1;
  searchCondition.value.maxNumberOfPosts = 10;
  searchCondition.value.sort = null;

  emit('search', searchCondition.value)
};

function changeSortCondition(value) {
  searchCondition.value.sort = value;
}

function changeMaxNumberOfPosts(value) {
  searchCondition.value.maxNumberOfPosts = value;
}

const changeCategory = (category) => {
  searchCondition.value.category = category.subCode;
};

</script>
<template>
  <b-row class="mb-2">
    <b-col cols="3" class="d-flex justify-content-start">
      <b-form-input class="currentDate text-center me-3" v-model="searchCondition.startDate" type="date"
                    placeholder="시작 날짜"></b-form-input>
      <b-form-input class="endDate text-center" v-model="searchCondition.endDate" type="date"
                    placeholder="끝 날짜"></b-form-input>
    </b-col>
    <b-col cols="9" class="d-flex justify-content-end">
      <b-form-input type="text" placeholder="게시글 검색" class="me-2" v-model="searchCondition.keyword"
                    style="max-width: 300px;"></b-form-input>
      <b-button variant="primary" size="sm" class="text-nowrap me-1" @click="$emit('search', searchCondition)">검색
      </b-button>
      <b-button variant="danger" size="sm" class="text-nowrap" @click="cleanSearchCondition">검색 초기화</b-button>
    </b-col>
  </b-row>

  <nav class="navbar mb-2 navbar-expand navbar-light bg-light rounded-2">
    <!-- Left Element -->
    <b-navbar-nav class="me-auto">
      <b-nav-item>
        <b-button variant="primary" class="mr-3" @click="$router.push({name:`${postFormRouteName}`})">
          <i class="bi bi-pencil-square" style="font-size:24px;"></i>
        </b-button>
      </b-nav-item>
    </b-navbar-nav>
    <!-- End Left Element -->

    <!-- Center Element -->
    <b-navbar-nav class="mx-auto">
      <b-nav-item v-for="category in categories" :key="category.subCode">
        <b-link class="nav-link fs-6" @click="changeCategory(category)" :value="category.subCode"
                :class="{ 'selected': category.subCode === searchCondition.category }">
          {{ category.subCodeTitle }}
        </b-link>
      </b-nav-item>
    </b-navbar-nav>

    <!-- End Center Element -->
    <!-- Right Element -->
    <b-navbar-nav class="ms-auto">
      <b-nav-item>
        <b-dropdown id="dropdown-1">
          <template #button-content>
            <i class="bi bi-sort-numeric-down" style="font-size:20px;"></i>
          </template>
          <b-dropdown-item v-for="numPosts in MAX_NUMBER_OF_POSTS" :key="numPosts"
                           @click="changeMaxNumberOfPosts(numPosts)"
                           :active="searchCondition.maxNumberOfPosts === numPosts">
            {{ numPosts }}개
          </b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
      <b-nav-item>
        <b-dropdown id="dropdown-1">
          <template #button-content>
            <i class="bi bi-sort-alpha-down" style="font-size:20px;"></i>
          </template>
          <b-dropdown-item v-for="sort in SORT_OPTIONS" :key="sort.key" @click="changeSortCondition(sort.value)"
                           :active="searchCondition.sort === sort.value" :disabled="sort.disabled">
            {{ sort.label }}
          </b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
    </b-navbar-nav>
    <!-- End Right Element -->
  </nav>
</template>
<script setup>
</script>