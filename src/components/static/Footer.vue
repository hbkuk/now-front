<template>
  <footer class="text-muted py-5">
    <b-container>
      <footer class="py-3 my-4">
        <b-nav class="justify-content-center border-bottom pb-3 mb-3">
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
        </b-nav>
        <p class="text-center text-muted">&copy; 2023 NOW, Inc</p>
      </footer>
    </b-container>
  </footer>
</template>
