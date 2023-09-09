<script setup>
import {store} from "@/store";
import {useHandleWelcomeOk} from "@/composable/modal/handleWelcomeModal";
import LogoImage from "@/components/common/LogoImage.vue";
</script>

<template>
  <b-modal
      id="welcomeModal"
      ref="modal"
      v-model="store.isShowWelcomeModal"
      ok-title="확인했어요"
      centered
      ok-only
      no-close-on-backdrop
      button-size="sm"
      @ok="useHandleWelcomeOk"
  >
    <template #title>
      <h5 class="modal-title"><b><b-badge variant="primary">INFO</b-badge>&nbsp; 첫 방문</b></h5>
    </template>
    <div class="text-center">
      <div class="bg-white">
        <LogoImage :image-name="`now-logo-name.png`"/>
      </div>
      <div class="my-4">
        환영합니다. <br/> <b>NOW</b>는 <b>정보 공유와 소통을 위한 플랫폼</b>입니다.
      </div>
      <div class="my-4">
        현재는
        <b-badge variant="secondary">테스트 기간 중</b-badge>
        이며, 종료일이 아직 확정되지 않았습니다.
        <br/>
        서비스 이용에 있어, <b>로딩 시간이 느릴 수 있습니다.</b> 양해 부탁드립니다.
      </div>

      <div class="my-4">
        화면 하단 좌우에
        <b-badge variant="danger">오류 제보</b-badge>
        및
        <b-badge variant="primary">서비스 피드백 기능</b-badge>
        이 있습니다. <br/> 더 나은 서비스 제공을 위해 <b>소중한 의견을 기다리고 있습니다.</b>
        <br/>
        <b>감사합니다.</b>
      </div>
      <p><em> Now 서비스 운영자 드림</em></p>
    </div>
  </b-modal>
</template>
