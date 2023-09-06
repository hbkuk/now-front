<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PostService from "@/service/PostService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import ValidationError from "@/components/common/ValidationError.vue";
import {AttachmentType} from '@/composable/attachment/constants/AttachmentType';
import {useSavePostSubmitWithAttachments} from "@/composable/submitForm/post/savePostSubmitWithAttachments";
import CharacterCounter from "@/components/common/CharacterCounter.vue";

// 게시글의 하위 코드 그룹 찾기
const communitySubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.COMMUNITY);

// 커스텀 훅을 사용하여 게시글 작성을 위해 필요한 변수와 함수들을 가져옴
const {
  post, submitError, attachmentUploadErrors,
  useHandleAttachment, useSubmit
}
    = useSavePostSubmitWithAttachments(AttachmentType.FILE,
    "community", PostService.saveCommunity, 'CommunityPost')

/**
 * 게시글을 등록하는 함수
 */
async function handleSubmit() {
  await useSubmit();
}


</script>
<template>
  <!-- PostFormHeader 컴포넌트 사용 -->
  <PostFormHeader :routeNameForPush="'Communities'"/>
  <b-container>
    <b-row>
      <b-col>
        <!-- 게시글 작성을 위한 카드 컴포넌트 -->
        <b-card class="mb-4">
          <b-card-body>
            <h3 class="h6 mb-4"></h3>
            <b-row>
              <b-col>
                <!-- 게시글 작성 폼 -->
                <b-form>
                  <b-form-group label="토픽">
                    <!-- 토픽 선택을 위한 셀렉트 박스 -->
                    <b-form-select v-model="post.category">
                      <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                      <b-form-select-option v-for="category in communitySubCodeGroup" :key="category.subCode"
                                            :value="category.subCode">
                        {{ category.subCodeTitle }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <template v-if="submitError && submitError.category">
                    <!-- 카테고리 에러 메시지 출력 -->
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
                      <CharacterCounter
                          :currentCharacterCount="post.title?.length"
                          :maxCharacterCount="100"
                      />
                    </b-form-group>
                    <template v-if="submitError && submitError.title">
                      <!-- 제목 에러 메시지 출력 -->
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
                      <CharacterCounter
                          :currentCharacterCount="post.content?.length"
                          :maxCharacterCount="2000"
                      />
                    </b-form-group>
                    <template v-if="submitError && submitError.content">
                      <!-- 내용 에러 메시지 출력 -->
                      <ValidationError :message="submitError.content"/>
                    </template>

                    <!-- 파일 업로드 입력 폼 -->
                    <div class="mb-5">
                      <label for="formFileMultiple" class="form-label">파일 업로드</label>
                      <input @change="useHandleAttachment" class="form-control" type="file" id="formFileMultiple"
                             multiple
                             ref="fileInput">
                    </div>
                    <template v-if="attachmentUploadErrors.hasUnsupportedExtensions">
                      <!-- 파일 확장자 에러 메시지 출력 -->
                      <ValidationError :message="`확장자 jpg, gif, png, zip만 업로드 가능합니다.`"/>
                    </template>
                    <template v-if="attachmentUploadErrors.isMaxUploadCountExceeded">
                      <!-- 파일 업로드 개수 초과 에러 메시지 출력 -->
                      <ValidationError :message="`최대 5개의 파일까지 업로드 가능합니다.`"/>
                    </template>
                    <template v-if="attachmentUploadErrors.isSizeExceeded">
                      <!-- 파일 크기 초과 에러 메시지 출력 -->
                      <ValidationError :message="`파일의 크기는 최대 2,048,000 byte 입니다.`"/>
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