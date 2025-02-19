<script setup lang="ts">
interface ButtonItemProps {
  title: string,
  type?: 'button' | 'submit' | 'reset',
}
const { title, type="button" } = defineProps<ButtonItemProps>()

</script>

<template>
  <div class="text-right">
    <button class="mt-2 px-6 py-1 rounded bg-indigo-700 text-indigo-50" :type="type">{{ title }}</button>
  </div>
</template>

<style scoped>

</style>
