import {reactive, ref} from 'vue'

export const store = reactive({
    categories: [],
    updateCategories(newCategories) {
        this.categories = newCategories
    },
})