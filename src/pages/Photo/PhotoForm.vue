<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import ValidationError from "@/components/common/ValidationError.vue";
import {useSavePostSubmitWithAttachments} from "@/composable/submitForm/savePostSubmitWithAttachments";
import {AttachmentType} from "@/composable/attachment/constants/AttachmentType";
import PostService from "@/service/PostService";
import {ref} from "vue";


const communitySubCodeGroup = useFindSubCodeGroup(store.categories, PostGroup.PHOTO);

const {post, formData, submitError, attachmentUploadErrors, hasAttachmentUploadErrors,
  useHandleAttachment, useSubmit}
    = useSavePostSubmitWithAttachments(AttachmentType.IMAGE,
    "photo",  PostService.savePhoto)

const selectedFile = ref(null);

const useHandleThumbnail = (event) => {
  if (hasAttachmentUploadErrors(event.target.files)) {
    selectedFile.value = null;
    event.target.value = "";
    return;
  }
  formData.value.delete('thumbnail');
  formData.value.append('thumbnail', ...event.target.files);

  const fileInput = event.target;
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      selectedFile.value = {
        file: file,
        preview: reader.result
      };
    };
    reader.readAsDataURL(file);
  } else {
    selectedFile.value = null;
  }
};

</script>
<template>
  <PostFormHeader :routeNameForPush="'Photos'"/>
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
                      <b-form-select-option v-for="category in communitySubCodeGroup" :key="category.subCode"
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

                      <!-- 대표 이미지 업로드 -->
                      <div class="mb-5">
                        <label for="formFile" class="form-label">대표 이미지 업로드</label>
                        <input class="form-control" type="file" id="formFile" ref="fileInput"
                               @change="useHandleThumbnail">
                      </div>

                      <!-- 파일 업로드 -->
                      <div class="mb-5">
                        <label for="formFileMultiple" class="form-label">이미지 업로드</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput"
                               @change="useHandleAttachment">
                      </div>
                      <template v-if="attachmentUploadErrors.hasUnsupportedExtensions">
                        <ValidationError :message="`확장자 jpg, gif, png만 가능합니다.`"/>
                      </template>
                      <template v-if="attachmentUploadErrors.isMaxUploadCountExceeded">
                        <ValidationError :message="`최대 20개의 파일까지 업로드 가능합니다.`"/>
                      </template>
                      <template v-if="attachmentUploadErrors.isSizeExceeded">
                        <ValidationError :message="`파일의 크기는 최대 1,024,000 byte 입니다.`"/>
                      </template>

                      <!-- 대표 이미지 미리보기 -->
                      <div class="mb-5">
                        <label for="formFile" class="form-label">대표 이미지 미리보기</label>
                        <b-img v-if="selectedFile" :src="selectedFile.preview"
                               fluid-grow style="border-radius: 10px;" alt="Fluid-grow image"></b-img>

                        <div v-else class="bg-white py-1">
                          <b-skeleton class="img-fluid rounded mx-auto d-block w-100" height="20rem"></b-skeleton>
                        </div>
                      </div>

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