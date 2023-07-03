<script setup>
import {computed, ref} from "vue";

const id = ref('')
const password = ref('')

const idState = ref(null)
const passwordState = ref(null)

const isFormValid = computed(() => {
  return (
      idState.value === true &&
      passwordState.value === true
  );
});

const validateAndLogin = () => {
  idState.value = id.value.length > 2;
  passwordState.value = password.value.length > 2;

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
          패스워드를 입력하세요.
        </b-form-invalid-feedback>
      </b-row>

      <b-row>
        <router-link class="router-link text-decoration-none text-primary text-end" :to="{ name: `Forgot` }">계정찾기
        </router-link>
      </b-row>

      <b-row class="mb-1 mt-1">
        <b-button block @click="validateAndLogin" variant="primary">로그인</b-button>
      </b-row>

      <b-row>
        <span class="text-end"> 아직 회원이 아니신가요?
          <router-link class="router-link text-decoration-none text-primary"
                       :to="{ name: `SignUp` }">회원가입</router-link>
        </span>
      </b-row>
    </div>
  </div>
</template>