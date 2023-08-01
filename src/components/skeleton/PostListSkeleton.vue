<script setup>

const props = defineProps({
  postsCount: {
    type: Number,
    required: true,
    default: 5
  }
})

</script>
<template>
  <div v-for="(post, index) in postsCount" :key="index" class="card rounded-2 row-hover pos-relative pb-2 px-3 mb-1 border-0 rounded-0 border-bottom border-secondary card-hover">
      <b-row>
        <b-col md="10" class="d-flex justify-content-center">
          <b-row class="text-center w-100 float-end align-items-center flex-column">
            <b-col class="p-0 d-flex align-items-center">
              <b-skeleton variant="warning" pill height="1rem" width="4rem" class="me-2"></b-skeleton>
              <b-skeleton variant="primary" pill height="1rem" width="6rem" class="me-2"></b-skeleton>
              <b-skeleton variant="success" pill height="1rem" width="6rem" class="me-2"></b-skeleton>
              <b-skeleton variant="secondary" pill height="1rem" width="4rem" class="me-2"></b-skeleton>
            </b-col>
            <b-col class="p-0 d-flex align-items-center">
              <div class="text-sm">
                <b-skeleton height="1rem" width="10rem" class="me-2"></b-skeleton>
                <b-skeleton height="1rem" width="10rem" class="me-2"></b-skeleton>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="2">
          <b-row class="text-center float-end align-items-center flex-column">
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <b-skeleton height="1rem" width="2rem" class="me-1"></b-skeleton>
              <b-skeleton height="1rem" width="3rem"></b-skeleton>
            </b-col>
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <b-skeleton height="1rem" width="2rem" class="me-1"></b-skeleton>
              <b-skeleton height="1rem" width="3rem" v-if="post.comments"></b-skeleton>
            </b-col>
            <b-col class="p-0 d-flex align-items-center" style="height: 100px;">
              <b-skeleton height="1rem" width="2rem" class="me-1"></b-skeleton>
              <b-skeleton height="1rem" width="3rem"></b-skeleton>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
  </div>
</template>
