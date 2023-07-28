<template>
  <b-container>
    <b-navbar toggleable="lg" class="bg-white text-black">
      <b-navbar-brand to="/"><b>NOW</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="me-auto mb-2 mb-lg-0 ms-lg-4 text-truncate">

          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Notices' }" class="router-link text-decoration-none text-secondary">공지사항</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Communities' }" class="router-link text-decoration-none text-secondary">커뮤니티</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Photos' }" class="router-link text-decoration-none text-secondary">사진</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Inquiries' }" class="router-link text-decoration-none text-secondary">문의</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <div class="d-flex px-3">
          <b-form-input type="text" placeholder="게시글 검색" class="me-2 d-block d-sm-none d-xxl-block d-xl-block d-lg-block"></b-form-input>
          <b-button variant="primary" pill class="text-nowrap d-block d-sm-none d-xxl-block d-xl-block d-lg-block" type="button">검색</b-button>
        </div>

        <b-navbar-nav  v-if="store.isUserSignedIn()" style="font-size: 1.5rem;">
          <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <router-link :to="{ name: 'Notification' }" class="router-link text-decoration-none text-secondary">
              <i class="bi bi-chat-left-dots"></i>
            </router-link>
          </b-nav-item>
          <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <router-link :to="{ name: 'Settings' }" class="router-link text-decoration-none text-secondary">
              <i class="bi bi-person"></i>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-else style="font-size: 1.5rem;">
          <router-link :to="{ name: 'SignIn' }" class="router-link text-decoration-none text-secondary">
            <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
              <b-button pill class="px-4" variant="outline-secondary">로그인</b-button>
            </b-nav-item>
          </router-link>
          <router-link :to="{ name: 'SignUp' }" class="router-link text-decoration-none text-secondary">
            <b-nav-item href="#" class="d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
              <b-button pill class="px-4" variant="primary">회원가입</b-button>
            </b-nav-item>
          </router-link>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script setup>
import {store} from "@/store";
</script>