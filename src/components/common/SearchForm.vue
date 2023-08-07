<script setup>
import {ref, watch} from "vue";
import {useGetPastDate} from "@/composable/date/getPastDate";
import {useGetCurrentDate} from "@/composable/date/getCurrentDate";
import {MAX_NUMBER_OF_POSTS, SORT, SORT_OPTIONS} from "@/composable/param/constants/condition";

const emit = defineEmits(['search'])

const props = defineProps({
  condition: Object,
  categories: Object,
  postFormRouteName: String
})

const condition = ref({
  startDate: props.condition.startDate,
  endDate: props.condition.endDate,
  postGroup: props.condition.postGroup,
  category: props.condition.category,
  keyword: props.condition.keyword,
  pageNo: props.condition.pageNo,
  maxNumberOfPosts: props.condition.maxNumberOfPosts,
  sort: props.condition.sort
});

/**
 * 검색 조건을 초기화
 *
 * @function
 * @returns {void}
 */
const cleanCondition = () => {
  condition.value.startDate = useGetPastDate(365);
  condition.value.endDate = useGetCurrentDate();
  condition.value.postGroup = props.condition.postGroup;
  condition.value.category = null;
  condition.value.keyword = null;
  condition.value.pageNo = 1;
  condition.value.maxNumberOfPosts = 10;
  condition.value.sort = SORT.LATEST;

  emit('search', condition.value)
};

/**
 * 정렬 옵션을 변경하는 함수
 *
 * @function
 * @param {string} value - 변경할 정렬 옵션 값
 * @returns {void}
 */
function changeSort(value) {
  condition.value.sort = value;
}

/**
 * 한 페이지에 보여질 게시글 수를 변경하는 함수
 *
 * @function
 * @param {number} value - 변경할 한 페이지에 보여질 게시글 수 값
 * @returns {void}
 */
function changeMaxNumberOfPosts(value) {
  condition.value.maxNumberOfPosts = value;
}

/**
 * 카테고리를 변경하는 함수
 *
 * @function
 * @param {Object} category - 변경할 카테고리 객체
 * @param {string} category.subCode - 변경할 카테고리 서브 코드 값
 * @returns {void}
 */
const changeCategory = (category) => {
  condition.value.category = category.subCode;
};

/**
 * 검색을 실행하는 함수
 *
 * @function
 * @returns {void}
 */
function search() {
  emit('search', condition.value)
}

/**
 * condition 객체의 startDate, endDate, category, maxNumberOfPosts, sort 필드를 감시합
 *
 * @function
 * @param {Array} source - 감시 대상 필드들의 배열
 * @param {function} callback - 감시 대상 필드들이 변경될 때 호출될 콜백 함수
 * @param {Object} options - watch 옵션 객체
 * @param {boolean} options.deep - 중첩된 객체를 감시하는 옵션
 * @returns {void}
 */
watch(
    () => [
        condition.value.startDate, condition.value.endDate,
        condition.value.category, condition.value.maxNumberOfPosts,
        condition.value.sort
    ],
    (newStartDate) => {
      search();
    },
    { deep: true } // deep 옵션을 사용하여 중첩된 객체를 감시합니다.
);


</script>
<template>
  <b-row class="mb-2">
    <b-col cols="3" class="d-flex justify-content-start">
      <b-form-input class="currentDate text-center me-3" v-model="condition.startDate" type="date"
                    placeholder="시작 날짜"></b-form-input>
      <b-form-input class="endDate text-center" v-model="condition.endDate" type="date"
                    placeholder="끝 날짜"></b-form-input>
    </b-col>
    <b-col cols="9" class="d-flex justify-content-end">
      <b-form-input type="text" placeholder="제목, 내용, 닉네임 ..." class="me-2" v-model="condition.keyword"
                    style="max-width: 300px;"></b-form-input>
      <b-button variant="primary" size="sm" class="text-nowrap me-1" @click="search()">검색
      </b-button>
      <b-button variant="danger" size="sm" class="text-nowrap" @click="cleanCondition">검색 초기화</b-button>
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
                :class="{ 'selected': category.subCode === condition.category }">
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
                           :active="condition.maxNumberOfPosts === numPosts">
            {{ numPosts }}개
          </b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
      <b-nav-item>
        <b-dropdown id="dropdown-1">
          <template #button-content>
            <i class="bi bi-sort-alpha-down" style="font-size:20px;"></i>
          </template>
          <b-dropdown-item v-for="sort in SORT_OPTIONS" :key="sort.key" @click="changeSort(sort.value)"
                           :active="condition.sort === sort.value" :disabled="sort.disabled">
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