<script setup>
import {defineProps, ref} from "vue";
import {useCapitalizeFirstLetter} from "@/composable/uitls/capitalizeFirstLetter";
import {useGetTimeDifference} from "@/composable/date/getTimeDifference";
import {useRoute} from "vue-router";
import {store} from "@/store";
import {useFormatNumber} from "@/composable/number/formatNumber";
import ReactionButton from "@/components/common/ReactionButton.vue";

const emit = defineEmits(['deletePost', 'updatePostReaction'])

const props = defineProps({
  post: Object,
  postEditRouteName: String,
  postReaction: Object
});

const isShowPostModal = ref(false);

/**
 * 삭제 확인 버튼을 처리하는 함수
 */
function handleDeletePost() {
  emit('deletePost');
  isShowPostModal.value = false;
}

/**
 * 반응을 업데이트하는 함수
 *
 * @param {string} newReaction - 새로운 반응
 */
function updatePostReaction(newReaction) {
  emit('updatePostReaction', newReaction);
}

</script>
<template>

  <div class="board bg-white text-dark py-1 text-left">
    <b-container class="mt-3">
      <b-row align-h="between" class="justify-content-start">
        <b-col cols="2">
          <b class="text-nowrap"><i
              class="bi bi-three-dots-vertical pe-2"></i>{{ useCapitalizeFirstLetter(post.category) }}</b>
        </b-col>

        <b-col cols="2" class="d-flex justify-content-end">
          <div>
            <b-dropdown v-if="store.isSameMember(post.memberNickname)" size="lg" variant="link"
                        toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <i class="bi bi-exclamation-circle" style="font-size:20px;"></i> &nbsp;
              </template>
              <b-dropdown-item>
                <router-link class="text-decoration-none text-dark"
                             :to="{ name: `${postEditRouteName}`, params: { postIdx: useRoute().params.postIdx } }">
                  <i class="bi bi-eraser"></i> 수정하기
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item @click="isShowPostModal = true"><i class="bi bi-trash"></i> 삭제하기</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
      </b-row>

    </b-container>
  </div>

  <b-container class="py-3">
    <div class="row">
      <div class="col-md-12">
        <article>
          <div class="post-content">

            <div class="row">
              <div class="col-md-12 text-container-wrap">
                <h2>{{ post.title }}</h2>
              </div>
            </div>

            <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li v-if="post.memberNickname" class="breadcrumb-item text-secondary truncate-text">
                  <span class="text-container-wrap">{{ post.memberNickname }}</span>
                </li>
                <li v-if="post.managerNickname" class="breadcrumb-item text-secondary truncate-text">
                  <span class="text-container-wrap">{{ post.managerNickname }}</span>
                </li>
                <li class="breadcrumb-item text-secondary">{{ useGetTimeDifference(post.regDate) }}</li>
                <li v-if="post.comments" class="breadcrumb-item text-secondary">댓글
                  {{ useFormatNumber(post.comments.length) }}개
                </li>
              </ol>
            </nav>

            <div class="row">
              <div class="col-md-12 text-container-wrap my-3">
                <div v-html="post.content"></div>
              </div>
            </div>

            <slot></slot>

            <div class="d-flex justify-content-end align-items-center">
              <ReactionButton
                  :currentReaction="postReaction?.reaction"
                  :count="post.likeCount"
                  :iconName="`up`"
                  @updateReaction="updatePostReaction"
              />
              <ReactionButton
                  :currentReaction="postReaction?.reaction"
                  :count="post.dislikeCount"
                  :iconName="`down`"
                  @updateReaction="updatePostReaction"
              />
            </div>

            <hr/>
          </div>
        </article>
      </div>
    </div>
  </b-container>

  <!-- 모달 -->
  <b-modal
      id="deletePostModal"
      ref="modal"
      v-model="isShowPostModal"
      title="게시글 삭제"
      cancel-title="취소하기"
      ok-title="삭제하기"
      centered
      @ok="handleDeletePost"
  >
    <b class="mb-0">정말로 삭제하시겠습니까?</b>
  </b-modal>

</template>