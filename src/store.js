import { reactive } from 'vue';

const storedCategories = JSON.parse(sessionStorage.getItem("categories")) || [];

export const store = reactive({
    categories: storedCategories,
});
