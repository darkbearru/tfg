<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'

defineProps({
	root: { type: HTMLDivElement, default: null }
});
const emit = defineEmits<{
	(e: 'isHidden', id: number): void
}>();

// const isVisible = shallowRef(false);

function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  const isVisible = entry?.isIntersecting || false;
  if (!isVisible) {
		emit('isHidden', 1);
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center text-center py-2 px-4 bg-lime-200"
    v-intersection-observer="[onIntersectionObserver, { root }]"
  >
    <slot />
  </div>
</template>

<style scoped></style>