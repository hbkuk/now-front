<script setup>
import {ref} from "vue";
import ErrorType from "@/composable/response/ErrorType";
import ReportService from "@/service/ReportService";
import ValidationError from "@/components/common/ValidationError.vue";

const submitError = ref(null);
const isSuccessSubmit = ref(false);

const bug = ref({
  content: '',
});
const feedback = ref({
  content: '',
});

const isOpenBugReportModal = ref(false);
const isOpenFeedbackReportModal = ref(false);

/**
 * 오류 제보를 위한 모달 표시
 */
const openBugReportModal = () => {
  isOpenBugReportModal.value = true;
};

/**
 * 피드백 전송을 위한 모달 표시
 */
const openFeedbackReportModal = () => {
  isOpenFeedbackReportModal.value = true;
};

/**
 * 오류 제보 모달 초기화
 */
function resetBugContent() {
  bug.value.content = '';
  submitError.value = null;
}

/**
 * 피드백 전송 모달 초기화
 */
function resetFeedbackContent() {
  feedback.value.content = '';
  submitError.value = null;
}

/**
 * 오류 제보 버튼을 클릭할 때 호출되는 함수
 */
function handleBugOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleBugSubmit()
}

/**
 * 피드백 전송 버튼을 클릭할 때 호출되는 함수
 */
function handleFeedbackOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleFeedbackSubmit()
}

/**
 * 오류 제보를 핸들링하는 함수
 *
 * @returns {Promise<void>}
 */
async function handleBugSubmit() {
  isOpenBugReportModal.value = false;
  try {
    await useBugSubmit(bug.value);
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

/**
 * 피드백 전송을 핸들링하는 함수
 *
 * @returns {Promise<void>}
 */
async function handleFeedbackSubmit() {
  isOpenFeedbackReportModal.value = false;
  try {
    await useFeedbackSubmit(feedback.value);
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

/**
 * 오류 제보
 *
 * @param data 제보할 오류 정보
 * @returns {Promise<void>}
 */
async function useBugSubmit(data) {
  try {
    await ReportService.sendBug(new Blob([JSON.stringify(data)], {type: 'application/json'})).then(() => {
      isSuccessSubmit.value = true;
      submitError.value = null;
      isOpenBugReportModal.value = false;

      setTimeout(() => {
        isSuccessSubmit.value = false;
      }, 3000); // 5초 후에 상태 해제 (적절한 시간으로 조정)
    });
  } catch (error) {
    if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
      submitError.value = error.response.data.message;
    }
  }
}

/**
 * 피드백 전송
 *
 * @param data 전송할 피드백 정보
 * @returns {Promise<void>}
 */
async function useFeedbackSubmit(data) {
  try {
    await ReportService.sendFeedback(new Blob([JSON.stringify(data)], {type: 'application/json'})).then(() => {
      isSuccessSubmit.value = true;
      submitError.value = null;
      isOpenFeedbackReportModal.value = false;

      setTimeout(() => {
        isSuccessSubmit.value = false;
      }, 3000); // 5초 후에 상태 해제 (적절한 시간으로 조정)
    });
  } catch (error) {
    if (error.response?.data?.errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
      submitError.value = error.response.data.message;
    }
  }
}

</script>

<template>
  <div class="bottom-sticky">
    <b-row align-h="between" class="justify-content-start">
      <b-col cols="6">
        <div class="bug-report-button p-3">
          <b-button size="sm" variant="danger" pill @click="openBugReportModal">
            <i class="bi bi-bug"></i>&nbsp; <b>오류 제보</b>
          </b-button>
        </div>
      </b-col>
      <b-col cols="6" class="d-flex justify-content-end">
        <div class="bug-report-button p-3">
          <b-button size="sm" variant="primary" pill @click="openFeedbackReportModal">
            <i class="bi bi-clipboard-check"></i>&nbsp; <b>서비스 의견</b>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>

  <!-- 모달 -->
  <b-modal
      id="bugReportModal"
      ref="modal"
      v-model="isOpenBugReportModal"
      title="버그 제보"
      cancel-title="취소하기"
      ok-title="제보하기"
      @show="resetBugContent()"
      @hidden="resetBugContent()"
      @ok="handleBugOk"
      centered
      no-close-on-backdrop
  >

    <b class="mb-0">오류 내용을 간략하게 적어주세요.</b>
    <b-form class="mt-3">
      <b-form-group label-for="bug-content-input">
        <b-form-textarea
            v-model="bug.content"
            id="bug-content-input"
            placeholder="입력 ...(최소 1글자, 최대 2000글자)"
            required
            minlength="4"
            maxlength="2000"
            style="height: 100px;"
        ></b-form-textarea>
      </b-form-group>
    </b-form>
    <template v-if="submitError !== null && submitError.content !== null">
      <ValidationError :message="submitError.content"/>
    </template>
  </b-modal>

  <!-- 모달 -->
  <b-modal
      id="feedbackReportModal"
      ref="modal"
      v-model="isOpenFeedbackReportModal"
      title="서비스 의견"
      cancel-title="취소하기"
      ok-title="전송하기"
      @show="resetFeedbackContent()"
      @hidden="resetFeedbackContent()"
      @ok="handleFeedbackOk"
      centered
      no-close-on-backdrop
  >

    <b class="mb-0"> 서비스에 의견을 듣고 싶습니다</b>
    <b-form class="mt-3">

      <b-form-group label-for="feedback-content-input">
        <b-form-textarea
            v-model="feedback.content"
            id="feedback-content-input"
            placeholder="입력 ...(최소 1글자, 최대 2000글자)"
            required
            minlength="4"
            maxlength="2000"
            style="height: 100px;"
        ></b-form-textarea>
      </b-form-group>
    </b-form>
    <template v-if="submitError !== null && submitError.content !== null">
      <ValidationError :message="submitError.content"/>
    </template>
  </b-modal>

  <b-alert
      v-model="isSuccessSubmit"
      class="position-fixed fixed-bottom m-0 rounded-0 text-center"
      style="z-index: 2000;"
      variant="success"
      dismissible
  >
    <b>소중한 의견 감사합니다.</b>
  </b-alert>

</template>

<style scoped>
.bottom-sticky {
  position: sticky;
  bottom: 0;
  background-color: white; /* Adjust as needed */
  z-index: 100; /* Adjust as needed */
}
</style>