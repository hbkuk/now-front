<script setup>
import {store} from "@/store";
</script>

<template>
  <b-modal
      id="WarnModal"
      v-model="store.isDuplicateRequesting"
      centered
      ok-only
      no-close-on-backdrop
      ok-title="확인했어요"
      button-size="sm"
  >
    <!-- 제목에 HTML 태그 사용 -->
    <template #title>
      <h5 class="modal-title"><b><b-badge variant="warning">WARN</b-badge>&nbsp; 반복된 요청</b></h5>
    </template>
      <span>
        <b>짧은 시간 동안 반복된 요청</b>을 하였습니다.<br />
        이로 인해 <b>추가적인 요청이 차단될 수 있습니다.</b><br/>
        <br/>
        <b>서비스 이용에 참고해 주시기 바랍니다. 감사합니다.</b>
      </span>
  </b-modal>
</template>
