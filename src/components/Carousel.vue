<script setup>
import { ref } from "vue";

const props = defineProps({
  attachments: Array, // Use Array type instead of Object
});

const activeIndex = ref(0);

const slides = props.attachments.map((attachment) => ({
  src: `/file/${attachment.savedAttachmentName}`,
  alt: attachment.originalAttachmentName,
}));

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
}

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
}
</script>


<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(slide, index) in slides" :key="index" :class="{ 'active': index === activeIndex }">
          <img :src="slide.src" class="d-block w-100 rounded" :alt="slide.alt">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" @click.prevent="prevSlide">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" @click.prevent="nextSlide">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
