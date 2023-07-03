<script setup>
import {computed, ref} from "vue";

const id = ref('')
const password = ref('')
const passwordConfirm = ref('')
const name = ref('')
const nickname = ref('')

const idState = ref(null)
const passwordState = ref(null)
const passwordConfirmState = ref(null)
const nameState = ref(null)
const nicknameState = ref(null)

const isFormValid = computed(() => {
  return (
      idState.value === true &&
      passwordState.value === true &&
      passwordConfirmState.value === true &&
      nameState.value === true &&
      nicknameState.value === true
  );
});

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
           :src="require(`@/resources/banner/login.png`)"
           alt="Main image"/>
  </div>

  <div class="d-flex justify-content-center mt-2">
    <div class="w-25" role="group">
      <div class="text-center mb-3 text-nowrap text-truncate">
        <h3>NOW에 오신것을 환영합니다.</h3>
        <div>NOW는 지식공유 플랫폼입니다.</div>
      </div>

      <b-row class="mb-1">
        <label class="p-0" for="input-id">아이디</label>
        <b-form-input
            id="input-id"
            v-model="id"
            :state="idState"
            aria-describedby="input-id-help input-id-feedback"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-id-feedback">
          아이디를 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <b-row class="my-1">
        <label class="p-0" for="input-password">비밀번호</label>
        <b-form-input
            id="input-password"
            type="password"
            v-model="password"
            :state="passwordState"
            aria-describedby="input-password-help input-password-feedback"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-password-feedback">
          비밀번호를 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <b-row class="my-1">
        <label class="p-0" for="input-passwordConfirm">비밀번호 확인</label>
        <b-form-input
            id="input-passwordConfirm"
            type="password"
            v-model="passwordConfirm"
            :state="passwordConfirmState"
            aria-describedby="input-passwordConfirm-help input-passwordConfirm-feedback"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-passwordConfirm-feedback">
          비밀번호가 다릅니다.
        </b-form-invalid-feedback>
      </b-row>

      <b-row class="my-1">
        <label class="p-0" for="input-name">성명</label>
        <b-form-input
            id="input-name"
            v-model="name"
            :state="nameState"
            aria-describedby="input-name-help input-name-feedback"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-name-feedback">
          이름을 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <b-row class="my-1">
        <label class="p-0" for="input-nickname">닉네임</label>
        <b-form-input
            id="input-nickname"
            v-model="nickname"
            :state="nicknameState"
            aria-describedby="input-nickname-help input-nickname-feedback"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-nickname-feedback">
          닉네임을 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <b-row class="mb-1 mt-5">
        <b-button block @click="validateAndSingUp" variant="primary">회원가입</b-button>
      </b-row>

      <b-row class="mt-2">
        <span class="text-end"> 이미 회원이신가요?
          <router-link class="router-link text-decoration-none text-primary"
                       :to="{ name: `Login` }">로그인</router-link>
        </span>
      </b-row>
    </div>
  </div>
</template>