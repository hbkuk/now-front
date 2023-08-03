<script setup>
import {computed, ref} from "vue";

// 반응성 객체들
const id = ref(''); // ID 입력을 담는 반응성 객체
const password = ref(''); // 비밀번호 입력을 담는 반응성 객체
const passwordConfirm = ref(''); // 비밀번호 확인 입력을 담는 반응성 객체
const name = ref(''); // 성명 입력을 담는 반응성 객체
const nickname = ref(''); // 닉네임 입력을 담는 반응성 객체

// 각 입력 필드의 유효성 상태를 담는 반응성 객체들
const idState = ref(null);
const passwordState = ref(null);
const passwordConfirmState = ref(null);
const nameState = ref(null);
const nicknameState = ref(null);

// computed 속성을 이용하여 폼의 유효성을 계산하는 함수
const isFormValid = computed(() => {
  return (
      idState.value === true &&
      passwordState.value === true &&
      passwordConfirmState.value === true &&
      nameState.value === true &&
      nicknameState.value === true
  );
});

// 폼 유효성을 검증하고 회원가입을 시도하는 함수
const validateAndSingUp = () => {
  idState.value = id.value.length > 2;
  passwordState.value = password.value.length > 2;
  passwordConfirmState.value = passwordState.value !== false && passwordConfirm.value === password.value;
  nameState.value = name.value.length > 2;
  nicknameState.value = nickname.value.length > 2;

  if (isFormValid.value) {
    console.log("전송 성공")
    return;
  }
};

</script>

<template>
  <div class="bg-white py-1 mt-5">
    <b-img center style="height: 100px" class="img-fluid rounded d-block"
           :src="require(`@/resources/banner/now-icon-login-signup.png`)"
           alt="Main image"/>
  </div>

  <div class="d-flex justify-content-center mt-2">
    <div class="w-25" role="group">
      <div class="text-center mb-lg-4 text-nowrap text-truncate">
        <h3 class="emphasis">NOW에 오신것을 환영합니다.</h3>
        <div>NOW는 지식공유 플랫폼입니다.</div>
      </div>

      <hr class="mb-3">

      <!-- ID 입력란 -->
      <b-row class="mb-3">
        <label class="p-0" for="input-id"><b>ID</b></label>
        <b-form-input
            id="input-id"
            v-model="id"
            :state="idState"
            aria-describedby="input-id-help input-id-feedback"
            trim
        ></b-form-input>

        <!-- ID 입력 유효성 메시지 -->
        <b-form-invalid-feedback id="input-id-feedback">
          아이디를 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <!-- 비밀번호 입력란 -->
      <b-row class="mb-3">
        <label class="p-0" for="input-password"><b>비밀번호</b></label>
        <b-form-input
            id="input-password"
            type="password"
            v-model="password"
            :state="passwordState"
            aria-describedby="input-password-help input-password-feedback"
            trim
        ></b-form-input>

        <!-- 비밀번호 입력란과 유효성 메시지 템플릿 -->
        <b-form-invalid-feedback id="input-password-feedback">
          비밀번호를 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <!-- 비밀번호 확인 입력란 -->
      <b-row class="mb-3">
        <label class="p-0" for="input-passwordConfirm"><b>비밀번호 확인</b></label>
        <b-form-input
            id="input-passwordConfirm"
            type="password"
            v-model="passwordConfirm"
            :state="passwordConfirmState"
            aria-describedby="input-passwordConfirm-help input-passwordConfirm-feedback"
            trim
        ></b-form-input>

        <!-- 비밀번호 확인 입력란과 유효성 메시지 템플릿 -->
        <b-form-invalid-feedback id="input-passwordConfirm-feedback">
          비밀번호가 다릅니다.
        </b-form-invalid-feedback>
      </b-row>

      <!-- 성명 입력란 -->
      <b-row class="mb-3">
        <label class="p-0" for="input-name"><b>성명</b></label>
        <b-form-input
            id="input-name"
            v-model="name"
            :state="nameState"
            aria-describedby="input-name-help input-name-feedback"
            trim
        ></b-form-input>

        <!-- 성명 입력란과 유효성 메시지 템플릿 -->
        <b-form-invalid-feedback id="input-name-feedback">
          이름을 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <!-- 닉네임 입력란 -->
      <b-row class="mb-3">
        <label class="p-0" for="input-nickname"><b>닉네임</b></label>
        <b-form-input
            id="input-nickname"
            v-model="nickname"
            :state="nicknameState"
            aria-describedby="input-nickname-help input-nickname-feedback"
            trim
        ></b-form-input>

        <!-- 닉네임 입력란과 유효성 메시지 템플릿 -->
        <b-form-invalid-feedback id="input-nickname-feedback">
          닉네임을 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <!-- 회원가입 버튼 -->
      <b-row class="mb-1 mt-5">
        <b-button block @click="validateAndSingUp" variant="primary"><b>회원가입</b></b-button>
      </b-row>

      <hr class="mt-5">

      <!-- 로그인 링크 -->
      <b-row class="mb-2">
        <span class="text-end"> 이미 회원이신가요?
          <router-link class="router-link text-decoration-none text-primary"
                       :to="{ name: `SignIn` }">로그인</router-link>
        </span>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
.emphasis {
  font-weight: bold;
  text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
}
</style>