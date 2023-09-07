<script setup>
import {ref} from "vue";

const bucketPath = process.env.VUE_APP_PUBLIC_BUCKET_URL;
const uploadDirectoryName = process.env.VUE_APP_UPLOAD_DIRECTORY_NAME;

const props = defineProps({
  thumbnailAttachmentIdx: Number,
  attachments: Array
});

const activeIndex = ref(0);

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

const isImageVisible = ref(true);

function prevSlide() {
  isImageVisible.value = false; // 현재 이미지 숨기기
  setTimeout(() => {
    activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
    isImageVisible.value = true; // 새로운 이미지 나타내기
  }, 300); // 숨기고 나타나는 시간 설정 (milliseconds)
}

function nextSlide() {
  isImageVisible.value = false; // 현재 이미지 숨기기
  setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length;
    isImageVisible.value = true; // 새로운 이미지 나타내기
  }, 300); // 숨기고 나타나는 시간 설정 (milliseconds)
}
</script>


<template>

  <div class="mb-3">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(slide, index) in slides" :key="index"
             :class="{ 'active': index === activeIndex }">
          <div class="image-container" :class="{ 'hidden': !isImageVisible }">
            <b-img
                v-if="index === activeIndex"
                :src="`${bucketPath}${uploadDirectoryName}${slide.src}`"
                :alt="slide.alt"
                class="carousel-image"
                fluid
            ></b-img>
          </div>
        </div>
      </div>

      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" @click.prevent="prevSlide">
        <i class="bi bi-chevron-left b-md-icon" style=" color: #1d4b8f"></i>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" @click.prevent="nextSlide">
        <i class="bi bi-chevron-right b-md-icon" style="color: #1d4b8f"></i>
      </a>

    </div>
  </div>
</template>

<style scoped>
/* 배경색을 조금 더 투명하게 설정 */
.carousel-control-prev,
.carousel-control-next {
  background-color: rgba(241, 243, 245, 0.2); /* 배경색과 투명도를 조절합니다. */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 색과 투명도를 조절합니다. */
  border: none; /* 기본적인 버튼 테두리 제거 */
}

/* 활성화된 상태일 때 배경색을 더 투명하게 설정 */
.carousel-control-prev.active,
.carousel-control-next.active {
  background-color: rgba(206, 212, 218, 0.5); /* 활성화된 상태의 배경색과 투명도를 조절합니다. */
}


/* 이미지 컨테이너 스타일 설정 */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: opacity 0.3s ease-in-out; /* 트랜지션 지속 시간 조정 */
}

.image-container.hidden {
  opacity: 0.9;
  pointer-events: none; /* 이미지가 숨겨진 경우 클릭 이벤트 비활성화 */
  transform: scale(0.99); /* 이미지가 숨겨진 경우 약간 축소된 크기로 나타냄 */
}


.carousel-image {
  max-height: 100%;
  max-width: 100%;
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

