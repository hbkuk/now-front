<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import PostService from "@/service/PostService";
import ValidationError from "@/components/common/ValidationError.vue";
import ErrorType from "@/composable/response/ErrorType";
import {useSavePostSubmit} from "@/composable/submitForm/post/savePostSubmit";

// 문의 게시글의 토픽 하위 코드 그룹 가져오기
const subCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.INQUIRY);

// useSavePostSubmit 커스텀 훅을 사용하여 게시글 저장에 필요한 데이터와 함수 가져오기
const {post, submitError, useSubmit}
    = useSavePostSubmit("inquiry", PostService.saveInquiry)

// 게시글 객체의 비밀글 설정 초기값을 false로 설정
post.value.secret = false;

/**
 * 게시글을 등록하는 함수
 */
async function handleSubmit() {
  try {
    await useSubmit();
  } catch (error) {
    if (error.response?.data?.errorCode === ErrorType.INVALID_SECRET) {
      submitError.value.password = "비밀번호를 설정하셔야 합니다.";
    }
  }
}
</script>

<template>
  <!-- 게시글 작성 헤더 컴포넌트 PostFormHeader 사용 -->
  <PostFormHeader :routeNameForPush="'Inquiries'"/>
  <b-container>
    <b-row>
      <b-col>
        <b-card class="mb-4">
          <b-card-body>
            <h3 class="h6 mb-4"></h3>
            <b-row>
              <b-col>
                <b-form>
                  <!-- 비밀글 설정 체크박스 -->
                  <div class="mb-3">
                    <b-form-checkbox v-model="post.secret" switch size="lg">비밀글 설정</b-form-checkbox>
                  </div>
                  <!-- 비밀글 설정 오류가 있을 경우, 오류 메시지 출력 -->
                  <template v-if="submitError&&submitError.secret">
                    <ValidationError :message="submitError.secret"/>
                  </template>

                  <!-- 비밀글 설정이 true일 경우, 비밀번호 입력 폼 표시 -->
                  <template v-if="post.secret">
                    <b-form-group label="비밀글 비밀번호">
                      <b-form-input
                          v-model="post.password"
                          id="input-password"
                          type="password"
                          placeholder="4글자 이상, 15글자 이하여야 합니다"
                          minlength="4"
                          maxlength="15"
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <!-- 비밀번호 설정 오류가 있을 경우, 오류 메시지 출력 -->
                  <template v-if="submitError&&submitError.password">
                    <ValidationError :message="submitError.password"/>
                  </template>

                  <!-- 토픽 선택 폼 -->
                  <b-form-group label="토픽">
                    <b-form-select v-model="post.category">
                      <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                      <b-form-select-option v-for="category in subCodeGroup" :key="category.subCode" :value="category.subCode">
                        {{ category.subCodeTitle }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <!-- 토픽 선택 오류가 있을 경우, 오류 메시지 출력 -->
                  <template v-if="submitError&&submitError.category">
                    <ValidationError :message="submitError.category"/>
                  </template>

                  <!-- 제목 입력 폼 -->
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
                    <!-- 제목 입력 오류가 있을 경우, 오류 메시지 출력 -->
                    <template v-if="submitError&&submitError.title">
                      <ValidationError :message="submitError.title"/>
                    </template>

                    <!-- 내용 입력 폼 -->
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
                    <!-- 내용 입력 오류가 있을 경우, 오류 메시지 출력 -->
                    <template v-if="submitError&&submitError.content">
                      <ValidationError :message="submitError.content"/>
                    </template>

                    <!-- 등록 버튼 -->
                    <div class="d-grid gap-2 mt-4">
                      <b-button block variant="primary" @click="handleSubmit()"><i
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