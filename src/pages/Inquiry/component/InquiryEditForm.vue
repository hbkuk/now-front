<script setup>
import {defineProps, ref} from "vue";
import {store} from "@/store";
import {useFindSubCodeGroup} from "@/composable/store/findSubCodeGroup";
import {PostGroup} from "@/composable/store/PostGroup";

const props = defineProps({
  post: Object,
});

const selectedTopic = ref(props.post?.category || null);

const communitySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.INQUIRY);

</script>
<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card class="mb-4">
          <b-card-body>
            <h3 class="h6 mb-4"></h3>
            <b-row>
              <b-col>
                <b-form>
                  <b-form-group label="토픽">
                    <b-form-select v-model="selectedTopic">
                      <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                      <b-form-select-option v-for="category in communitySubCodeGroup" :key="category.subCode" :value="category.subCode">
                        {{ category.subCodeTitle }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <b-form>
                    <b-form-group label="제목">
                      <b-form-input
                          :model-value="props.post.title"
                          id="titleInput"
                          placeholder="4글자 이상, 100글자 이하여야 합니다"
                          required
                          minlength="4"
                          maxlength="100"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group label="내용">
                      <b-form-textarea
                          :model-value="props.post.content"
                          id="contentTextarea"
                          placeholder="4글자 이상, 2000글자 이하여야 합니다"
                          required
                          minlength="4"
                          maxlength="2000"
                          style="height: 300px;"
                      ></b-form-textarea>
                    </b-form-group>

                    <div class="d-grid gap-2 mt-4">
                      <b-button block variant="primary"><i
                          class="fa-regular fa-circle-check"></i> 수정
                      </b-button>
                    </div>
                  </b-form>

                </b-form>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script setup>
</script>