<script setup>
import {store} from "@/store";
import router from "@/router/router";
import {ref} from "vue";
import AuthenticationService from "@/service/AuthenticationService";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useRouteWatch} from "@/composable/router/routeWatch";

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const imagesDirectoryName = process.env.VUE_APP_IMAGES_DIRECTORY_NAME;

const {currentRouteName} = useRouteWatch();

/**
 * 로그아웃 요청하는 함수
 *
 * @returns {Promise<void>}
 */
async function logout() {
  await AuthenticationService.logout().then(() => {
    router.push({name: "Home"})
  }).catch(error => {
    console.log(error)
  })
}

const keyword = ref('');

/**
 * 검색을 수행하는 함수
 *
 * @returns {Promise<void>}
 */
async function searchPosts() {
  await router.push({name: 'Search', params: {q: keyword.value}});
}

</script>

<template>
  <div class="header">
    <b-container>
      <b-navbar toggleable="lg" class="bg-white text-black header">
        <b-navbar-brand to="/">
          <b-img
              style="height: 30px"
              class="rounded d-block"
              :src="`${bucketPath}${imagesDirectoryName}now-name.png`"
              alt="Main image"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav class="me-auto mb-2 mb-lg-0 ms-lg-4 text-truncate">

            <b-nav-item
                class="nav-item px-3"
                v-for="group in ROUTE_NAME_GROUP"
                :key="group.label"
                :class="{ 'selected': group.routes.includes(currentRouteName) }"
            >
              <router-link
                  :to="{ name: group.routes[0] }"
                  class="router-link text-decoration-none"
                  :class="{'text-secondary': !group.routes.includes(currentRouteName) }"
              >
                {{ group.label }}
              </router-link>
            </b-nav-item>


          </b-navbar-nav>

          <div class="d-flex px-3">
            <b-form-input type="text" placeholder="게시글 검색..."
                          class="me-2" style="width: 200px;"
                          v-model="keyword"></b-form-input>
            <b-button variant="primary" pill class="text-nowrap"
                      type="button" @click="searchPosts">검색
            </b-button>
          </div>

          <b-navbar-nav class="px-3" v-if="store.isMemberSignedIn()">

            <b-nav-item>
              <b-dropdown class="p-0" variant="variant" size="sm" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <i class="bi bi-chat-left-dots b-md-icon"></i>
                </template>
                <b-dropdown-item>
                  Service Not available..
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>
                  죄송합니다. 현재 서비스가 준비 중입니다.
                </b-dropdown-item>
              </b-dropdown>
            </b-nav-item>

            <b-nav-item class="px-3">
              <b-dropdown variant="variant" size="sm" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <i class="bi bi-person b-md-icon"></i>
                </template>
                <b-dropdown-item>
                  <i class="bi bi-person-circle b-md-icon"></i>&nbsp;&nbsp;마이페이지
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="logout()">
                  <i class="bi bi-box-arrow-right b-md-icon"></i>&nbsp;&nbsp;로그아웃
                </b-dropdown-item>
              </b-dropdown>
            </b-nav-item>

          </b-navbar-nav>

          <b-navbar-nav class="px-3" v-else>
            <router-link :to="{ name: 'SignIn' }" class="router-link text-decoration-none text-secondary">
              <b-nav-item href="#">
                <b-button pill class="text-truncate" variant="outline-secondary">로그인</b-button>
              </b-nav-item>
            </router-link>
            <router-link :to="{ name: 'SignUp' }" class="router-link text-decoration-none text-secondary">
              <b-nav-item href="#">
                <b-button pill class="text-truncate" variant="primary">회원가입</b-button>
              </b-nav-item>
            </router-link>

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </b-container>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background-color: white; /* Adjust as needed */
  z-index: 100; /* Adjust as needed */
}
</style>