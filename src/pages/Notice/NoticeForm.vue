<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import AuthenticationService from "@/service/AuthenticationService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import {useSavePostSubmit} from "@/composable/submitForm/useSavePostSubmit";
import PostService from "@/service/PostService";
import ValidationError from "@/components/common/ValidationError.vue";

const subCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.NOTICE);

const {post, submitError, useSubmit}
    = useSavePostSubmit("notice", PostService.saveNotice)

post.value.pinned = false;

const isManager = async () => {
  try {
    await AuthenticationService.isManager();
  } catch (error) {
    console.log(error);
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => isManager());
    }
  }
};

isManager(); // 컴포넌트가 마운트되기 전에 매니저 여부를 확인

</script>

<template>
  <PostFormHeader />
  <b-container>
    <b-row>
      <b-col>
        <b-card class="mb-4">
          <b-card-body>
            <h3 class="h6 mb-4"></h3>
            <b-row>
              <b-col>
                <b-form>

                  <div class="mb-3">
                    <b-form-checkbox v-model="post.pinned" switch size="lg">상단 고정</b-form-checkbox>
                  </div>
                  <template v-if="submitError&&submitError.pinned">
                    <ValidationError :message="submitError.pinned"/>
                  </template>


                  <b-form-group label="토픽">
                    <b-form-select v-model="post.category">
                      <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                      <b-form-select-option v-for="category in subCodeGroup" :key="category.subCode" :value="category.subCode">
                        {{ category.subCodeTitle }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <template v-if="submitError&&submitError.category">
                    <ValidationError :message="submitError.category"/>
                  </template>

                  <b-form>
                    <b-form-group label="제목">
                      <b-form-input
                          v-model="post.title"
                          id="titleInput"
                          placeholder="4글자 이상, 100글자 이하여야 합니다"
                          required
                          minlength="4"
                          maxlength="100"
                      ></b-form-input>
                    </b-form-group>
                    <template v-if="submitError&&submitError.title">
                      <ValidationError :message="submitError.title"/>
                    </template>


                    <b-form-group label="내용">
                      <b-form-textarea
                          v-model="post.content"
                          id="contentTextarea"
                          placeholder="4글자 이상, 2000글자 이하여야 합니다"
                          required
                          minlength="4"
                          maxlength="2000"
                          style="height: 300px;"
                      ></b-form-textarea>
                    </b-form-group>
                    <template v-if="submitError&&submitError.content">
                      <ValidationError :message="submitError.content"/>
                    </template>

                    <div class="d-grid gap-2 mt-4">
                      <b-button block variant="primary" @click="useSubmit()"><i
                          class="fa-regular fa-circle-check"></i> 등록
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