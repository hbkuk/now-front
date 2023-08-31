import {useGetRequest} from "@/composable/request/getRequest";

const CategoryService = {

    /**
     * 카테고리 목록을 가져오는 함수
     *
     * @returns {Promise<AxiosResponse<any>>} - 카테고리 목록
     */
    fetchCategories() {
        return useGetRequest('/api/categories')
    },
};

export default CategoryService;
