<script setup>
import {ref} from "vue";

const props = defineProps({
  thumbnailAttachmentIdx: Number,
  attachments: Array
});

const activeIndex = ref(0);

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;

let slides = props.attachments.map((attachment) => ({
  idx: attachment.attachmentIdx,
  src: attachment.savedAttachmentName,
  alt: attachment.originalAttachmentName,
}));

// attachmentIdx와 attachments 배열의 순서를 확인하여 초기 슬라이드 인덱스 설정
if (props.thumbnailAttachmentIdx !== undefined) {
  const initialIndex = slides.findIndex((slide) => slide.idx === props.thumbnailAttachmentIdx);
  if (initialIndex !== -1) {
    activeIndex.value = initialIndex;
  }
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
}

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
}
</script>


<template>

  <div class="mb-3">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(slide, index) in slides" :key="index"
             :class="{ 'active': index === activeIndex }">
          <div class="image-container">

            <b-img
                :src="`${bucketPath}${slide.src}`"
                :alt="slide.alt"
                class="carousel-image"
                fluid
            ></b-img>

          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" @click.prevent="prevSlide">
        <i class="bi bi-chevron-left carousel-control-next-icon" style="font-size:50px;"></i>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" @click.prevent="nextSlide">
        <i class="bi bi-chevron-right carousel-control-next-icon" style="font-size:50px;"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 그림자와 배경색을 설정할 클래스 */
.carousel-control-prev,
.carousel-control-next {
  background-color: #f1f3f5; /* 배경색을 변경할 수 있습니다. */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); /* 그림자를 추가하고, 그림자 색 및 투명도를 조절할 수 있습니다. */
  border: none; /* 기본적인 버튼 테두리 제거 */
}

/* 활성화된 상태일 때 배경색 변경 */
.carousel-control-prev.active,
.carousel-control-next.active {
  background-color: #ced4da; /* 활성화된 상태의 배경색을 변경할 수 있습니다. */
}

/* 이미지 컨테이너 스타일 설정 */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.carousel-image {
  max-height: 100%;
  max-width: 100%;
}

/* 이 부분에서 화살표 아이콘의 색상을 설정합니다. */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  color: #0056b3; /* 원하는 색상으로 변경하세요 */
}

/* 화면 크기에 따른 이미지 컨테이너 높이 조정 */
@media (max-width: 768px) {
  .image-container {
    height: 300px; /* 화면 너비가 768px 이하인 경우 이미지 컨테이너 높이를 300px로 설정합니다. */
  }
}

@media (min-width: 769px) {
  .image-container {
    height: 600px; /* 화면 너비가 769px 이상인 경우 이미지 컨테이너 높이를 600px로 설정합니다. */
  }
}
</style>

