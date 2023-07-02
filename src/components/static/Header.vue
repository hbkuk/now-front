<template>
  <b-container>
    <b-navbar toggleable="lg" class="bg-white text-black">
      <b-navbar-brand to="/">NOW</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="me-auto mb-2 mb-lg-0 ms-lg-4 text-truncate">

          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Notices' }" class="router-link text-decoration-none text-secondary">공지사항</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Community' }" class="router-link text-decoration-none text-secondary">커뮤니티</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Photos' }" class="router-link text-decoration-none text-secondary">사진</router-link>
          </b-nav-item>
          <b-nav-item class="nav-item px-3">
            <router-link :to="{ name: 'Inquiries' }" class="router-link text-decoration-none text-secondary">문의</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-form class="d-flex px-3">
          <b-form-input type="text" placeholder="게시글 검색" class="me-2 d-block d-sm-none d-xxl-block d-xl-block d-lg-block"></b-form-input>
          <b-button variant="primary" class="text-nowrap d-block d-sm-none d-xxl-block d-xl-block d-lg-block" type="button">검색</b-button>
        </b-navbar-form>

        <b-navbar-nav style="font-size: 1.5rem;">
          <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <i class="bi bi-chat-left-dots"></i>
          </b-nav-item>
          <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <i class="bi bi-person"></i>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script setup>
</script>