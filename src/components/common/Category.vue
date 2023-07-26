<script setup>

const props = defineProps({
  categories: Object,
})
</script>

<template>
  <nav class="navbar mb-2 navbar-expand navbar-light bg-light rounded-2">
    <!-- Left Element -->
      <b-navbar-nav class="me-auto">
        <b-nav-item>
          <b-button variant="primary" class="mr-3">
            <i class="bi bi-pencil-square" style="font-size:24px;"></i>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    <!-- End Left Element -->

    <!-- Center Element -->
    <b-navbar-nav class="mx-auto">
      <b-nav-item v-for="category in categories" :key="category.subCode">
        <b-link class="nav-link fs-6" href="#!">{{ category.subCodeTitle }}</b-link>
      </b-nav-item>
    </b-navbar-nav>
    <!-- End Center Element -->
    <!-- Right Element -->
      <b-navbar-nav class="ms-auto">
        <b-nav-item>
          <b-dropdown id="dropdown-1">
            <template #button-content>
              <i class="bi bi-sort-numeric-down" style="font-size:20px;"></i>
            </template>
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
        </b-nav-item>
        <b-nav-item>
          <b-dropdown id="dropdown-1">
            <template #button-content>
              <i class="bi bi-sort-alpha-down" style="font-size:20px;"></i>
            </template>
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
        </b-nav-item>
      </b-navbar-nav>
    <!-- End Right Element -->
  </nav>
</template>