import {useGetRequest} from "@/composable/request/getRequest";
import {useHttpRequest} from "@/composable/request/httpRequest";
import {formUrlencoded, json, multipart} from "@/composable/request/constants/Headers";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";

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
