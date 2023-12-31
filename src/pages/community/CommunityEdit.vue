<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import PostService from "@/service/PostService";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import {useGetIconTagByExtension} from "@/composable/attachment/getIconTagByExtension";
import {useFormatBytes} from "@/composable/attachment/formatBytes";
import {AttachmentType} from "@/composable/attachment/constants/AttachmentType";
import {useEditPostSubmitWithAttachments,} from "@/composable/submitForm/post/editPostSubmitWithAttachments";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import ValidationError from "@/components/common/ValidationError.vue";
import CharacterCounter from "@/components/common/CharacterCounter.vue";
import {useGetPostSubmit} from "@/composable/submitForm/post/getPostSubmit";
import {useGetEditPostSubmit} from "@/composable/submitForm/post/getEditPostSubmit";

// 게시글의 하위 코드 그룹 찾기
const communitySubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.COMMUNITY);

// 컴포넌트에 전달된 postIdx prop 정의
const props = defineProps({
  postIdx: {
    type: String,
    default: '',
  },
});

// 컴포넌트 내에서 사용할 변수와 함수를 가져오는 커스텀 훅 사용
const {
  post,
  submitError,
  selectedDeleteAttachmentIndexes,
  isAttachmentIdxDeleted,
  attachmentUploadErrors,
  useHandleAttachment,
  useDeleteAttachment,
  useSubmit,
} = useEditPostSubmitWithAttachments(
    AttachmentType.FILE,
    "community",
    PostService.editCommunity,
    "CommunityPost"
);

// 수정 게시글 조회와 관련된 변수와 함수를 가져오는 커스텀 훅 사용
const {
  useSubmit: getEditCommunity,
} = useGetEditPostSubmit(post, PostService.fetchEditCommunity)

// 컴포넌트가 마운트되면 게시글 가져오기 실행
getEditCommunity(props.postIdx);

</script>

<template>
  <template v-if="post">
    <!-- PostFormHeader 컴포넌트 사용 -->
    <PostFormHeader :routeNameForPush="'Communities'"/>

    <!-- 게시글 편집 폼을 감싸는 컨테이너 -->
    <b-container>
      <b-row>
        <b-col>
          <!-- 게시글 수정을 위한 카드 컴포넌트 -->
          <b-card class="mb-4">
            <b-card-body>
              <h3 class="h6 mb-4"></h3>
              <b-row>
                <b-col>
                  <!-- 게시글 수정 폼 -->
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

                      <!-- 기존 업로드된 파일 목록 -->
                      <div class="mb-3" v-if="post.attachments && post.attachments.length > 0">
                        <b-badge class="mb-3" variant="danger">이미지 삭제</b-badge>
                        <ul class="list-group list-group-light">


                          <div v-for="(attachment, attachmentIdx) in post.attachments" :key="attachmentIdx"
                               class="list-group-item list-group-item-action px-3 border-1 ripple d-flex align-items-center">

                            <!-- 파일 이름과 기타 내용들을 표시 -->
                            <div class="flex-grow-1 text-decoration-none text-dark"
                                 v-if="!isAttachmentIdxDeleted(attachment.attachmentIdx)">
                                    <span v-if="attachment.attachmentExtension"
                                          v-dompurify-html="useGetIconTagByExtension(attachment.attachmentExtension)"></span>&nbsp;
                              <a :href="`/attachments/${attachment.attachmentIdx}`"
                                 class="text-decoration-none text-dark">
                                {{ attachment.originalAttachmentName }} ({{
                                  useFormatBytes(attachment.attachmentSize)
                                }})
                              </a>
                            </div>
                            <!-- 삭제된 파일 이름 표시 -->
                            <div class="flex-grow-1 text-decoration-line-through" v-else style="color: #ff0000;">
                              <span v-if="attachment.attachmentExtension"
                                    v-dompurify-html="useGetIconTagByExtension(attachment.attachmentExtension)"></span>&nbsp;
                              {{ attachment.originalAttachmentName }} ({{ useFormatBytes(attachment.attachmentSize) }})
                            </div>

                            <!-- 파일 삭제 버튼 -->
                            <button type="button" class="btn-close" aria-label="Delete"
                                    @click="useDeleteAttachment(attachment.attachmentIdx)"></button>
                          </div>

                        </ul>
                      </div>

                      <!-- 파일 업로드 입력 폼 -->
                      <div class="mb-5">
                        <label for="formFileMultiple" class="form-label">파일 업로드</label>
                        <input @change="useHandleAttachment" class="form-control" type="file"
                               id="formFileMultiple" multiple ref="fileInput">
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

                      <!-- 수정 버튼 -->
                      <div class="d-grid gap-2 mt-4">
                        <b-button block variant="primary" @click="useSubmit(postIdx)"><i
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

  <!-- 게시글 정보가 없을 경우 (로딩 중) -->
  <template v-else>
    <!-- 배경 배너 스켈레톤 컴포넌트 BackgroundBannerSkeleton 사용 -->
    <BackgroundBannerSkeleton/>
    <!-- 게시글 스켈레톤 컴포넌트 PostSkeleton 사용 -->
    <PostSkeleton/>
  </template>
</template>
