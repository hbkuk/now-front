<script setup>
import {store} from "@/store";
import {useHandleWelcomeOk} from "@/composable/modal/handleWelcomeModal";
</script>

<template>
  <b-modal
      id="welcomeModal"
      ref="modal"
      v-model="store.isShowWelcomeModal"
      title="Welcome"
      ok-title="확인했어요"
      centered
      ok-only
      no-close-on-backdrop
      button-size="sm"
      @ok="useHandleWelcomeOk"
  >
    <div class="text-center">
      <div class="bg-white py-1">
        <b-img center style="height: 100px" class="img-fluid rounded d-block"
               :src="require(`@/resources/banner/now-icon-login-signup.png`)"
               alt="Main image"/>
      </div>
      <div class="my-4">
        환영합니다. <br/> <b-badge variant="secondary">NOW</b-badge>는 <b>정보 공유와 소통을 위한 플랫폼</b>입니다.
      </div>
      <div class="my-4">
        현재는 <b-badge variant="secondary">테스트 기간 중</b-badge>이며, 종료일이 아직 확정되지 않았습니다.
        <br/>
        서비스 이용에 있어, <b-badge variant="warning">로딩 시간이 느릴 수 있습니다.</b-badge> 양해 부탁드립니다.
      </div>

      <div class="my-4">
        현재까지 <b>발견한 오류(모바일 환경에서 갑작스런 화면 이동)에 대해서는 공지사항</b>에 적어두었습니다. 확인해주세요.
      </div>

      <div class="my-4">
        화면 하단 좌우에 <b-badge variant="danger">오류 제보</b-badge> 및 <b-badge variant="primary">서비스 피드백 기능</b-badge>이 있습니다. <br/> <b>더 나은 서비스 제공을 위해 소중한 의견을 기다리고 있습니다.</b>
      </div>
      <div class="my-4">
        <b>감사합니다.</b>
      </div>
    </div>
  </b-modal>
</template>
