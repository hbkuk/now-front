<template>
  <b-container>
    <b-row class="mt-3 mb-3">
      <b-col cols="auto">
        <b-button variant="secondary" size="sm" @click="$router.go(-1)">
          <i class="fa-solid fa-arrow-left"></i> 나가기
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>