<script setup>
import {store} from "@/store";
import {watch} from "vue";

/**
 * 오류 제보 버튼을 클릭할 때 호출되는 함수
 */
function resetRequesting() {
  store.updateIsTooManyRequesting(false);
  store.updateIsCurrentRequesting(false);
}

// watch 함수 내에서 타이머 변수를 선언
let remainingRequestTimer = null;

watch(
    () => store.remainingRequestSeconds,
    (newRemainingRequestSeconds) => {
      // 기존 타이머가 있다면 삭제
      if (remainingRequestTimer !== null) {
        clearInterval(remainingRequestTimer);
      }

      remainingRequestTimer = setInterval(() => {
        if (newRemainingRequestSeconds > 0) {
          store.updateRemainingRequestSeconds(newRemainingRequestSeconds - 1);
        }
      }, 1000); // 1초마다 호출
    }
);
</script>

<template>
  <b-modal
      id="WarnModal"
      v-model="store.isTooManyRequesting"
      centered
      ok-only
      no-close-on-backdrop
      ok-title="확인"
      button-size="sm"
      @ok="resetRequesting"
  >
    <!-- 제목에 HTML 태그 사용 -->
    <template #title>
      <h5 class="modal-title"><b>
        <b-badge variant="warning">WARN</b-badge>&nbsp; 요청 차단</b></h5>
    </template>
    <span>
      짧은 시간 동안 <b>너무 많은 요청</b>을 하여, 현재 요청이 차단되었습니다.<br/>
      추가적인 요청을 하기 전에 <b>잠시 기다려 주시기 바랍니다.</b><br/>
      <br/>
    </span>
    <div v-if="store.getRemainingRequestSeconds() !== 0">
      <div>다음 요청을 시도하기 전까지:&nbsp; <b><b-badge variant="secondary">{{ store.getRemainingRequestSeconds() }}</b-badge>&nbsp; 초 남음</b></div>
    </div>
  </b-modal>
</template>
