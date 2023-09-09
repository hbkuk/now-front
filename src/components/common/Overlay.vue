<script setup>
import {store} from "@/store";
</script>
<template>
  <div>
    <!-- 오버레이 -->
    <div v-if="store?.isCurrentRequesting" class="custom-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style>
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #0000fa;
  border-bottom-color: #0000fa;
  animation: spinner .8s ease infinite;
}
</style>
