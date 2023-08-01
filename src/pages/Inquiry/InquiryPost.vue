<script setup>
import Post from "@/components/Post.vue";
import BackgroundBanner from "@/components/common/BackgroundBanner.vue";
import {ref} from "vue";
import PostService from "@/service/PostService";
import Comments from "@/components/Comments.vue";
import Answer from "@/components/Answer.vue";
import ErrorType from "@/composable/response/ErrorType";
import CommonMessage from "@/components/common/CommonMessage.vue";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import router from "@/router/router";
import Error from "@/components/common/Error.vue";
import PostSkeleton from "@/components/skeleton/PostSkeleton.vue";
import BackgroundBannerSkeleton from "@/components/skeleton/BackgroundBannerSkeleton.vue";
import {store} from "@/store";

const fetchInquiryData = ref(null);
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
async function getInquiry(postIdx) {
  try {
    const response = await PostService.fetchInquiry(postIdx);
    fetchInquiryData.value = response?.data;
  } catch (error) {
    console.log(error);
    const errorCode = error?.response?.data?.errorCode;

    // TODO: 코드 리팩토링
    if (errorCode === ErrorType.CAN_NOT_VIEW_SECRET_INQUIRY) {
      if(store.isMemberSignedIn()) {
        try {
          const response = await PostService.fetchSecretInquiry(postIdx);
          fetchInquiryData.value = response?.data;
        } catch (error) {
          if (error?.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
            try {
              await useRefreshTokenAndRetry(() => getInquiry(postIdx));
            } catch (error) {
              modalShow.value = true;
            }
          } else {
            modalShow.value = true;
          }
        }
      }
      if(!store.isMemberSignedIn()) {
        modalShow.value = true;
      }
    }
  }
}

getInquiry(props.postIdx);

const submitError = ref(null)
/** 반환된 에러를 담는 반응성 객체 */
const   modalShow = ref(false)
const password = ref('')

/**
 * 비밀번호 초기화 함수
 */
function resetPassword() {
  password.value = ''
}

/**
 * 비밀글 열람 확인 버튼 함수
 *
 * @param {Event} bvModalEvent - 모달 이벤트 객체
 */
function handleOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleSubmit()
}

/**
 * 비밀글 열람 서버 패스워드 전송 함수
 */
async function handleSubmit() {
  const formData = new FormData
  formData.append('password', password.value)

  try {
    const response = await PostService.fetchSecretInquiry(props.postIdx, formData);
    modalShow.value = false;
    fetchInquiryData.value = response?.data;
  } catch (error) {
    if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
      await useRefreshTokenAndRetry(() => handleSubmit());
    }
    if (error.response?.data?.errorCode === ErrorType.CAN_NOT_VIEW_OTHER_MEMBER_INQUIRIES) {
      submitError.value = error.response?.data;
    }
  }
}

</script>

<template>
  <template v-if="fetchInquiryData">
    <BackgroundBanner :title="`Inquiry`" :banner-path="`community.png`"/>

    <b-container class="mt-3">
      <Post :post="fetchInquiryData"
            :PostEditRouteName="`InquiryEdit`"/>
      <template v-if="fetchInquiryData.answerManagerNickname">
        <Answer :post="fetchInquiryData"/>
      </template>
      <template v-if="fetchInquiryData.comments">
        <Comments :comments="fetchInquiryData.comments"/>
      </template>
    </b-container>
  </template>
  <template v-else-if="modalShow">
    <CommonMessage
        :imagePath="`secret.jpg`"
        :title="`비밀글 설정`"
        :content="`이 게시글은 비밀글로 설정되어있습니다.`"
    />
  </template>
  <template v-else>
    <BackgroundBannerSkeleton />
    <PostSkeleton/>
  </template>


  <!-- 모달 -->
  <b-modal
      id="inputPasswordModal"
      ref="modal"
      v-model="modalShow"
      title="비밀글 열람"
      cancel-title="취소하기"
      ok-title="열람하기"
      @show="resetPassword"
      @hidden="resetPassword"
      @ok="handleOk"
      @cancel="router.go(-1)"
      @close="router.go(-1)"
      centered
      no-close-on-backdrop
  >
    <b>비밀번호를 입력해 주세요.</b>
    <form ref="form" class="mt-3">
      <b-form-group
          label-for="password-input"
          invalid-feedback="비밀번호는 필수입니다."
      >
        <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            required
        />
      </b-form-group>
    </form>
    <div v-if="submitError !== null">
      <Error :error="submitError"/>
    </div>
  </b-modal>

</template>