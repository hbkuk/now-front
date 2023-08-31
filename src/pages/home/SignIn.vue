<script setup>
import {computed, ref} from "vue";
import Error from "@/components/common/Error.vue";
import AuthenticationService from "@/service/AuthenticationService";
import router from "@/router/router";

const id = ref(''); // ID 입력을 담는 반응성 객체
const password = ref(''); // 비밀번호 입력을 담는 반응성 객체
const idState = ref(null); // ID 유효성 상태를 담는 반응성 객체
const passwordState = ref(null); // 비밀번호 유효성 상태를 담는 반응성 객체

// computed 속성을 이용하여 폼의 유효성을 계산하는 함수
const isFormValid = computed(() => {
  return (
      idState.value === true && passwordState.value === true
  );
});

// 폼 유효성을 검증하고 로그인을 시도하는 함수
const validateAndSignIn = () => {
  idState.value = id.value.length > 1;
  passwordState.value = password.value.length > 1;

  if (isFormValid.value) {
    idState.value = null;
    passwordState.value = null;
    return submitForm();
  }
};

// 서버 데이터 전송 및 로그인 처리하는 함수
const submitError = ref(null)

/** 서버 데이터 전송 처리하는 함수 */
async function submitForm() {
  const formData = new FormData();

  formData.append("id", id.value)
  formData.append("password", password.value)

  // 로그인 요청 보내기
  await AuthenticationService.signIn(formData).then(response => {
    // 로그인 성공 시 홈 페이지로 이동
    router.push({name: "Home"})
  }).catch(error => {
    // 로그인 실패 시 에러 메시지 처리
    if (error.response.data.errorCode === 2001) {
      submitError.value = error.response.data;
    }
  })
}

</script>

<template>
  <!-- 로그인 화면 템플릿 -->
  <div class="bg-white py-1 mt-5">
    <b-img
        center
        style="height: 100px"
        class="img-fluid rounded d-block"
        :src="require(`@/resources/banner/now-icon-login-signup.png`)"
        alt="Main image"
    />
  </div>

  <div class="d-flex justify-content-center mt-2">
    <div role="group">
      <div class="text-center mb-lg-4 text-nowrap text-truncate">
        <h3 class="emphasis">NOW에 오신것을 환영합니다.</h3>
        <div>NOW는 지식공유 플랫폼입니다.</div>
      </div>

      <hr class="mb-3">

      <!-- 조건부 렌더링: 로그인 실패로 인한 Error Message -->
      <template v-if="submitError !== null && submitError.error !== null">
        <Error :error="submitError"/>
      </template>

      <b-container>
        <b-form>
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
              ID를 제대로 입력하세요.
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
                autocomplete="off"
            ></b-form-input>

            <!-- 비밀번호 입력 유효성 메시지 -->
            <b-form-invalid-feedback id="input-password-feedback">
              비밀번호를 제대로 입력하세요.
            </b-form-invalid-feedback>
          </b-row>

          <!-- 로그인 버튼 -->
          <b-row class="mb-1 mt-1">
            <b-button block @click="validateAndSignIn" variant="primary"
            ><b>로그인</b></b-button
            >
          </b-row>

          <hr class="mt-5">

          <!-- 회원가입과 계정 찾기 링크 -->
          <b-row class="mb-2">
          <span class="text-center"
          >아직 회원이 아니신가요?
            <router-link
                class="router-link text-decoration-none text-primary"
                :to="{ name: `SignUp` }"
            >회원가입</router-link
            ></span
          >
          </b-row>

          <b-row>
          <span class="text-center"
          >계정을 잃어버리셨나요?
            <router-link
                class="router-link text-decoration-none text-primary"
                :to="{ name: `Forgot` }"
            >계정찾기</router-link
            ></span>
          </b-row>
        </b-form>
      </b-container>
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