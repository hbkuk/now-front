<template>
  <b-row class="mb-2">
    <b-col cols="3" class="d-flex justify-content-start">
      <b-skeleton class="currentDate text-center me-3" variant="border" width="8rem" height="2rem"></b-skeleton>
      <b-skeleton class="endDate text-center" variant="border" width="8rem" height="2rem"></b-skeleton>
    </b-col>
    <b-col cols="9" class="d-flex justify-content-end">
      <b-skeleton class="me-2" variant="border" width="300px" height="2rem"></b-skeleton>
      <b-skeleton class="text-nowrap me-1" variant="primary" width="6rem" height="2rem"></b-skeleton>
      <b-skeleton class="text-nowrap" variant="danger" width="8rem" height="2rem"></b-skeleton>
    </b-col>
  </b-row>
</template>
