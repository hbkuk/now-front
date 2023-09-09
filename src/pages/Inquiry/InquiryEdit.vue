<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PostService from "@/service/PostService";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import ValidationError from "@/components/common/ValidationError.vue";
import {onBeforeUpdate} from "vue";
import {useEditPrivacyPostSubmit} from "@/composable/submitForm/post/editPrivacyPostSubmit";
import CharacterCounter from "@/components/common/CharacterCounter.vue";

const inquirySubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.INQUIRY);

const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 문의 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getEditInquiry(postIdx) {
  try {
    const response = await PostService.fetchEditInquiry(postIdx);
    post.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => getEditInquiry(postIdx));
    }
  }
}

getEditInquiry(props.postIdx);

// 컴포넌트 내에서 사용할 변수와 함수를 가져오는 커스텀 훅 사용
const {
  post,
  isPasswordChanging,
  handlePasswordSetting,
  submitError,
  useSubmit,
} = useEditPrivacyPostSubmit(
    "inquiry",
    PostService.editInquiry,
    "InquiryPost"
);

/**
 * 게시글을 등록하는 함수
 */
async function handleEditSubmit(postIdx) {
  await useSubmit(postIdx, existSecret);
}

let existSecret = false;

// 컴포넌트의 데이터가 변경되고 화면이 업데이트되기 직전에 실행
onBeforeUpdate(() => {
  existSecret = post.value.secret;
});

</script>
<template>
  <template v-if="post">
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

                    <template v-if="existSecret">
                      <b-form-group v-if="post.secret" label="기존 비밀글 비밀번호">
                        <div class="d-flex align-items-center text-nowrap gap-1">
                          <b-button @click="handlePasswordSetting()"
                                    :variant="isPasswordChanging ? 'danger' : 'outline-warning'">
                            {{ isPasswordChanging ? '변경취소' : '변경하기' }}
                          </b-button>
                          <b-form-input
                              id="exist-input-password"
                              type="password"
                              placeholder="보안을 위해 암호화되어 확인할 수 없습니다. 변경하기를 통해 다시 설정해 주세요."
                              disabled
                              autocomplete="off"
                          ></b-form-input>
                        </div>
                      </b-form-group>

                      <b-form-group v-if="post.secret && isPasswordChanging" label="새로운 비밀글 비밀번호">
                        <b-form-input
                            v-model="post.password"
                            id="new-input-password"
                            type="password"
                            placeholder="4글자 이상, 15글자 이하여야 합니다"
                            minlength="4"
                            maxlength="15"
                            autocomplete="off"
                        ></b-form-input>
                        <CharacterCounter
                            :currentCharacterCount="post.password?.length"
                            :maxCharacterCount="15"
                        />
                      </b-form-group>
                    </template>

                    <template v-else>
                      <b-form-group v-if="post.secret" label="새로운 비밀글 비밀번호">
                        <b-form-input
                            v-model="post.password"
                            id="new-input-password"
                            type="password"
                            placeholder="4글자 이상, 15글자 이하여야 합니다"
                            minlength="4"
                            maxlength="15"
                            autocomplete="off"
                        ></b-form-input>
                        <CharacterCounter
                            :currentCharacterCount="post.password?.length"
                            :maxCharacterCount="15"
                        />
                      </b-form-group>
                    </template>


                    <!-- 비밀번호 설정 오류가 있을 경우, 오류 메시지 출력 -->
                    <template v-if="submitError&&submitError.password">
                      <ValidationError :message="submitError.password"/>
                    </template>

                    <b-form-group label="토픽">
                      <b-form-select v-model="post.category">
                        <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                        <b-form-select-option v-for="category in inquirySubCodeGroup" :key="category.subCode"
                                              :value="category.subCode">
                          {{ category.subCodeTitle }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                    <template v-if="submitError && submitError.category">
                      <!-- 카테고리 에러 메시지 출력 -->
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
                        <CharacterCounter
                            :currentCharacterCount="post.title?.length"
                            :maxCharacterCount="100"
                        />
                      </b-form-group>
                      <template v-if="submitError && submitError.title">
                        <!-- 제목 에러 메시지 출력 -->
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
                        <CharacterCounter
                            :currentCharacterCount="post.content?.length"
                            :maxCharacterCount="2000"
                        />
                      </b-form-group>
                      <template v-if="submitError && submitError.content">
                        <!-- 내용 에러 메시지 출력 -->
                        <ValidationError :message="submitError.content"/>
                      </template>

                      <div class="d-grid gap-2 mt-4">
                        <b-button @click="handleEditSubmit(postIdx)" block variant="primary"><i
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
  <template v-else>
    <BackgroundBannerSkeleton/>
    <PostSkeleton/>
  </template>
</template>