<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PostService from "@/service/PostService";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import ValidationError from "@/components/common/ValidationError.vue";
import {AttachmentType} from '@/composable/attachment/constants/AttachmentType';
import {useSavePostSubmitWithAttachments} from "@/composable/submitForm/savePostSubmitWithAttachments";

const subCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.COMMUNITY);

const {post, submitError, attachmentUploadErrors,
        useHandleAttachment, useSubmit}
    = useSavePostSubmitWithAttachments(AttachmentType.FILE,
          "community",  PostService.saveCommunity)
</script>
<template>
  <PostFormHeader :routeNameForPush="'Communities'"/>

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
                    <b-form-select v-model="post.category">
                      <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                      <b-form-select-option v-for="category in subCodeGroup" :key="category.subCode"
                                            :value="category.subCode">
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

                    <div class="mb-5">
                      <label for="formFileMultiple" class="form-label">파일 업로드</label>
                      <input @change="useHandleAttachment" class="form-control" type="file" id="formFileMultiple" multiple
                             ref="fileInput">
                    </div>
                    <template v-if="attachmentUploadErrors.hasUnsupportedExtensions">
                      <ValidationError :message="`확장자 jpg, gif, png, zip만 업로드 가능합니다.`"/>
                    </template>
                    <template v-if="attachmentUploadErrors.isMaxUploadCountExceeded">
                      <ValidationError :message="`최대 5개의 파일까지 업로드 가능합니다.`"/>
                    </template>
                    <template v-if="attachmentUploadErrors.isSizeExceeded">
                      <ValidationError :message="`파일의 크기는 최대 2,048,000 byte 입니다.`"/>
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