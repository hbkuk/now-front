<script setup>
import {computed, ref} from "vue";
import MemberService from "@/service/MemberService";
import ErrorType from "@/composable/response/ErrorType";
import router from "@/router/router";
import Error from "@/components/common/Error.vue";
import AuthenticationService from "@/service/AuthenticationService";

const ID_REGEX = /^[A-Za-z0-9]{1,50}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{4,15}$/;
const NICKNAME_REGEX = /^[a-zA-Z가-힣]{1,50}$/;
const NAME_REGEX = /^[a-zA-Z가-힣]{2,15}$/;

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

// 정규식에 맞는지 검사하는 함수
const isValidFormat = (value, regex) => {
  return regex.test(value);
};

// 폼 유효성을 검증하고 회원가입을 시도하는 함수
const validateAndSingUp = () => {
  console.log("시발 왜안돼")
  idState.value = isValidFormat(id.value, ID_REGEX);
  passwordState.value = isValidFormat(password.value, PASSWORD_REGEX);
  passwordConfirmState.value = passwordState.value !== false && passwordConfirm.value === password.value;
  nameState.value = isValidFormat(name.value, NAME_REGEX);
  nicknameState.value = isValidFormat(nickname.value, NICKNAME_REGEX);

  if (isFormValid.value) {
    submitForm();
  }
};

// 서버 데이터 전송 및 로그인 처리하는 함수
const submitError = ref(null)

/**
 * 서버 데이터 전송 처리하는 함수
 *
 * @returns {Promise<void>}
 */
async function submitForm() {
  const formData = new FormData();

  formData.append("id", id.value)
  formData.append("password", password.value)
  formData.append("name", name.value)
  formData.append("nickname", nickname.value)

  try {
    await MemberService.signUp(formData);
    await AuthenticationService.signIn(formData);
    await router.push({name: "Home"});
  } catch (error) {
    handleErrors(error);
  }
}

/**
 * 서비스 호출에 의해서 발생한 에러 핸들링 함수
 *
 * @param error 에러 객체
 */
function handleErrors(error) {
  const errorCode = error.response?.data?.errorCode;

  if (errorCode === ErrorType.UNPROCESSABLE_ENTITY) {
    router.push({name: "RequestError"});
    return;
  }
  if ([ErrorType.DUPLICATE_MEMBER_INFO_ID,
    ErrorType.DUPLICATE_MEMBER_INFO_NICKNAME,
    ErrorType.DUPLICATE_MEMBER_INFO_ID_AND_NICKNAME].includes(errorCode)) {
    submitError.value = error.response.data;
    resetStates();
  }
}

/**
 * 상태 초기화
 */
function resetStates() {
  idState.value = null;
  passwordState.value = null;
  passwordConfirmState.value = null;
  nameState.value = null;
  nicknameState.value = null;
}


</script>

<template>
  <div class="bg-white mt-4 mb-5">
    <b-img center
           style="height: 60px"
           class="img-fluid rounded d-block"
           :src="require(`@/resources/banner/now-logo-name.png`)"
           alt="Main image"/>
  </div>

  <div class="d-flex justify-content-center mt-2 p-2">
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
                placeholder="영문자,숫자(1글자~50글자)"
            ></b-form-input>

            <!-- ID 입력 유효성 메시지 -->
            <b-form-invalid-feedback id="input-id-feedback">
              영문자와 숫자로만 구성되어야 합니다.(최소 1글자, 최대 50글자)
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
                placeholder="영문자,숫자,특수문자(4글자~15글자)"
                autocomplete="off"
            ></b-form-input>

            <!-- 비밀번호 입력란과 유효성 메시지 템플릿 -->
            <b-form-invalid-feedback id="input-password-feedback">
              영문자, 숫자, 특수문자를 모두 포함해야 합니다.(최소 4글자, 최대 15글자)
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
                autocomplete="off"
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
                placeholder="한글,영문자(2글자~15글자)"
            ></b-form-input>

            <!-- 성명 입력란과 유효성 메시지 템플릿 -->
            <b-form-invalid-feedback id="input-name-feedback">
              한글과 영문자로만 구성되어야 합니다.(최소 2글자, 최대 15글자)
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
                placeholder="한글,영문자(1글자~50글자)"
            ></b-form-input>

            <!-- 닉네임 입력란과 유효성 메시지 템플릿 -->
            <b-form-invalid-feedback id="input-nickname-feedback">
              한글과 영문자로만 구성되어야 합니다.(최소 1글자, 최대 50글자)
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
        </b-form>
      </b-container>
    </div>
  </div>
</template>