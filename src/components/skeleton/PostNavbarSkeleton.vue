<template>
  <nav class="navbar mb-2 navbar-expand navbar-light bg-light rounded-2">
    <!-- Left Element -->
    <b-navbar-nav class="me-auto">
      <b-nav-item>
        <b-skeleton variant="primary" width="2rem" height="2rem" class="mr-3"></b-skeleton>
      </b-nav-item>
    </b-navbar-nav>
    <!-- End Left Element -->

    <!-- Center Element -->
    <b-navbar-nav class="mx-auto">
        <b-skeleton variant="link" class="nav-link fs-6" height="1.5rem" width="8rem"></b-skeleton>
        <b-skeleton variant="link" class="nav-link fs-6" height="1.5rem" width="8rem"></b-skeleton>
        <b-skeleton variant="link" class="nav-link fs-6" height="1.5rem" width="8rem"></b-skeleton>
    </b-navbar-nav>
    <!-- End Center Element -->

    <!-- Right Element -->
    <b-navbar-nav class="ms-auto">
      <b-nav-item>
        <b-skeleton variant="primary" width="2rem" height="2rem"></b-skeleton>
      </b-nav-item>
      <b-nav-item>
        <b-skeleton variant="primary" width="2rem" height="2rem"></b-skeleton>
      </b-nav-item>
    </b-navbar-nav>
    <!-- End Right Element -->
  </nav>
</template>
<script setup>
</script>