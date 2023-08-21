<script setup>

import {useRouteWatch} from "@/composable/router/routeWatch";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";

const { currentRouteName } = useRouteWatch();

</script>
<template>
  <footer class="text-muted py-5">
    <b-container>
      <footer class="py-3 my-4">
        <b-nav class="justify-content-center border-bottom pb-3 mb-3 flex-nowrap text-nowrap">

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

        </b-nav>
        <p class="text-center text-muted">&copy; 2023 NOW, Inc</p>
      </footer>
    </b-container>
  </footer>
</template>
