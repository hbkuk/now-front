<script setup>
import {store} from "@/store";
import router from "@/router/router";
import {ref} from "vue";
import AuthenticationService from "@/service/AuthenticationService";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import {useRouteWatch} from "@/composable/router/routeWatch";

const { currentRouteName } = useRouteWatch();

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
  await router.push({ name: 'Search', params: { q: keyword.value } });
}

</script>

<template>
  <b-container>
    <b-navbar toggleable="lg" class="bg-white text-black">
      <b-navbar-brand to="/"><b>NOW</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="me-auto mb-2 mb-lg-0 ms-lg-4 text-truncate">

          <b-nav-item class="nav-item px-3" v-for="group in ROUTE_NAME_GROUP" :key="group.label"
                      :class="{ 'selected': group.routes.includes(currentRouteName) }">
            <router-link :to="{ name: group.routes[0] }"
                         class="router-link text-decoration-none text-secondary">{{ group.label }}</router-link>
          </b-nav-item>


        </b-navbar-nav>

        <div class="d-flex px-3">
          <b-form-input type="text" placeholder="게시글 검색..."
                        class="me-2 d-block d-sm-none d-xxl-block d-xl-block d-lg-block"
                        v-model="keyword"></b-form-input>
          <b-button variant="primary" pill class="text-nowrap d-block d-sm-none d-xxl-block d-xl-block d-lg-block"
                    type="button" @click="searchPosts">검색
          </b-button>
        </div>

        <b-navbar-nav class="ms-xl-5" v-if="store.isMemberSignedIn()" style="font-size: 1.5rem;">

          <b-nav-item class="d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <b-dropdown class="p-0" variant="variant" size="sm" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <i class="bi bi-chat-left-dots" style="font-size:24px;"></i>
              </template>
              <b-dropdown-item>
                알림 내용입니다 ....
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>
                알림 내용입니다 ....
              </b-dropdown-item>
            </b-dropdown>
          </b-nav-item>

          <b-nav-item class="d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
            <b-dropdown variant="variant" size="sm" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <i class="bi bi-person" style="font-size:24px;"></i>
              </template>
              <b-dropdown-item>
                <i class="bi bi-person-circle"></i>&nbsp;&nbsp;마이페이지
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout()">
                <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;로그아웃
              </b-dropdown-item>
            </b-dropdown>
          </b-nav-item>

        </b-navbar-nav>

        <b-navbar-nav v-else style="font-size: 1.5rem;">
          <router-link :to="{ name: 'SignIn' }" class="router-link text-decoration-none text-secondary">
            <b-nav-item href="#" class="ps-3 d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
              <b-button pill class="px-4 text-truncate" variant="outline-secondary">로그인</b-button>
            </b-nav-item>
          </router-link>
          <router-link :to="{ name: 'SignUp' }" class="router-link text-decoration-none text-secondary">
            <b-nav-item href="#" class="d-block d-sm-none d-xxl-block d-xl-block d-lg-block">
              <b-button pill class="px-4 text-truncate" variant="primary">회원가입</b-button>
            </b-nav-item>
          </router-link>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </b-container>
</template>