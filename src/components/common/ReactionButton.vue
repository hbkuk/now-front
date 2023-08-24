<script setup>
import {defineProps} from "vue";
import {useFormatNumber} from "@/composable/number/formatNumber";
import {Reaction} from "@/composable/reaction/Reaction";
import {store} from "@/store";

const props = defineProps({
  currentReaction: String,
  count: Number,
  iconName: String,
});

const emit = defineEmits(["updateReaction"]);

/**
 * 특정 아이콘 클래스를 반환하는 함수
 *
 * @returns {string} 아이콘 클래스 문자열
 */
const iconClass = () => {
  if( props.currentReaction === null) {
    if (props.iconName === 'up') {
      return `bi-hand-thumbs-${props.iconName.toLowerCase()} mx-2 icon-1x`;
    }
    if (props.iconName === 'down') {
      return `bi-hand-thumbs-${props.iconName.toLowerCase()} mx-2 icon-1x`;
    }
  }

  if (props.iconName === 'up') {
    if (props.currentReaction === Reaction.LIKE) {
      return `bi-hand-thumbs-${props.iconName.toLowerCase()}-fill mx-2 icon-1x text-primary`;
    }
    return `bi-hand-thumbs-${props.iconName.toLowerCase()} mx-2 icon-1x`;
  }

  if (props.iconName === 'down') {
    if (props.currentReaction === Reaction.DISLIKE) {
      return `bi-hand-thumbs-${props.iconName.toLowerCase()}-fill mx-2 icon-1x text-danger`;
    }
    return `bi-hand-thumbs-${props.iconName.toLowerCase()} mx-2 icon-1x`;
  }
}

/**
 * 반응 업데이트를 처리하는 함수
 */
function handleUpdateReaction() {
  if(!store.isMemberSignedIn()) {
    store.openSignInModal();
  }

  if (props.iconName === 'up') {
    if (props.currentReaction === Reaction.NOTTING) {
      updateReaction(Reaction.LIKE);
    }
    if (props.currentReaction === Reaction.LIKE) {
      updateReaction(Reaction.UNLIKE);
    }
    if (props.currentReaction === Reaction.UNLIKE) {
      updateReaction(Reaction.LIKE);
    }
    if (props.currentReaction === Reaction.DISLIKE) {
      updateReaction(Reaction.LIKE);
    }
    if (props.currentReaction === Reaction.UNDISLIKE) {
      updateReaction(Reaction.LIKE);
    }
  }

  if (props.iconName === 'down') {
    if (props.currentReaction === Reaction.NOTTING) {
      updateReaction(Reaction.DISLIKE);
    }
    if (props.currentReaction === Reaction.DISLIKE) {
      updateReaction(Reaction.UNDISLIKE);
    }
    if (props.currentReaction === Reaction.UNDISLIKE) {
      updateReaction(Reaction.DISLIKE);
    }
    if (props.currentReaction === Reaction.LIKE) {
      updateReaction(Reaction.DISLIKE);
    }
    if (props.currentReaction === Reaction.UNLIKE) {
      updateReaction(Reaction.DISLIKE);
    }
  }
}

/**
 * 반응을 업데이트하는 함수
 *
 * @param {string} reaction - 업데이트할 반응
 */
function updateReaction(reaction) {
  emit("updateReaction", reaction);
}

</script>

<template>
  <div class="reaction-icon icon-1x" @click="handleUpdateReaction">
    <i class="bi pe-1" :class="iconClass()"></i>
    <b-badge variant="light">{{ useFormatNumber(count) }}</b-badge>
  </div>
</template>

<style scoped>
.reaction-icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.reaction-icon i {
  margin-right: 5px;
}

.icon-1x {
  font-size: 1.2rem;
}
</style>

