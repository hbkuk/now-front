<script setup>
import {useHandleSignInOk} from "@/composable/modal/handleSignInModal";
import {store} from "@/store";
</script>

<template>
  <b-modal
    id="signInModal"
    ref="modal"
    v-model="store.isSignInModalVisible"
    title="로그인이 필요한 기능"
    cancel-title="취소하기"
    ok-title="이동하기"
    centered
    button-size="sm"
    @ok="useHandleSignInOk"
  >
    <b class="mb-0">로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?</b>
  </b-modal>
</template>