<script setup>
import PostFormHeader from "@/components/common/PostFormHeader.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import {useFindSubCodeGroup} from "@/composable/postGroup/findSubCodeGroup";
import {store} from "@/store";
import {PostGroup} from "@/composable/postGroup/PostGroup";
import {useEditPostSubmit} from "@/composable/submitForm/post/editPostSubmit";
import ValidationError from "@/components/common/ValidationError.vue";
import CharacterCounter from "@/components/common/CharacterCounter.vue";

const noticeSubCodeGroup = useFindSubCodeGroup(store.getCategory(), PostGroup.NOTICE);

// 게시글을 담는 반응성 객체
const fetchEditNoticeData = ref(null);

// props 설정, 게시글 번호를 props로 전달받음
const props = defineProps({
  postIdx: {
    type: String,
    default: ''
  }
});

/**
 * 공지 게시글을 가져오는 함수
 *
 * @param postIdx 게시글 번호
 * @returns {Promise<void>}
 */
async function getEditNotice(postIdx) {
  try {
    const response = await PostService.fetchEditNotice(postIdx);
    fetchEditNoticeData.value = response?.data;
  } catch (error) {
    console.log(error)
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      // 만료된 액세스 토큰일 경우 토큰 갱신 후 재시도
      await useRefreshTokenAndRetry(() => getEditNotice(postIdx));
    }
  }
}

// props로 전달된 postIdx를 이용하여 공지 게시글 가져오기 함수 호출
getEditNotice(props.postIdx);

// 컴포넌트 내에서 사용할 변수와 함수를 가져오는 커스텀 훅 사용
const {
  post,
  submitError,
  useSubmit,
} = useEditPostSubmit(
    "notice",
    PostService.editInquiry,
    "NoticePost"
);

</script>
<template>
  <!-- fetchEditNoticeData 값이 있을 경우 -->
  <template v-if="fetchEditNoticeData">
    <!-- 게시글 작성 헤더 컴포넌트 PostFormHeader 사용 -->
    <PostFormHeader :routeNameForPush="'Notices'"/>
    <!-- 공지 게시글 편집 폼 컴포넌트 NoticeEditForm 사용 -->
    <b-container>
      <b-row>
        <b-col>
          <b-card class="mb-4">
            <b-card-body>
              <h3 class="h6 mb-4"></h3>
              <b-row>
                <b-col>
                  <b-form>
                    <!-- 상단 고정 설정 체크박스 -->
                    <div class="mb-3">
                      <b-form-checkbox v-model="post.pinned" switch size="lg">상단 고정</b-form-checkbox>
                    </div>
                    <!-- 상단 고정 설정 오류가 있을 경우, 오류 메시지 출력 -->
                    <template v-if="submitError && submitError.pinned">
                      <ValidationError :message="submitError.pinned"/>
                    </template>

                    <b-form-group label="토픽">
                      <b-form-select v-model="post.category">
                        <b-form-select-option :value="null" selected>모든 토픽</b-form-select-option>
                        <b-form-select-option v-for="category in noticeSubCodeGroup" :key="category.subCode"
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
                            :model-value="post.title"
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
                            :model-value="post.content"
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
                        <b-button @click="useSubmit(postIdx)" block variant="primary"><i
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

  <!-- fetchEditNoticeData 값이 없을 경우 (로딩 중) -->
  <template v-else>
    <!-- 배경 배너 스켈레톤 컴포넌트 BackgroundBannerSkeleton 사용 -->
    <BackgroundBannerSkeleton/>
    <!-- 게시글 스켈레톤 컴포넌트 PostSkeleton 사용 -->
    <PostSkeleton/>
  </template>
</template>