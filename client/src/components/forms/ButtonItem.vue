<script setup lang="ts">
interface ButtonItemProps {
  title: string,
  type?: 'button' | 'submit' | 'reset',
}
const { title, type="button" } = defineProps<ButtonItemProps>()

</script>

<template>
  <div class="text-right">
    <button class="px-6 py-1 rounded bg-indigo-700 border border-indigo-700 hover:border-indigo-600 hover:bg-indigo-600 text-indigo-50 cursor-pointer" :type="type">{{ title }}</button>
  </div>
</template>

<style scoped>

</style>
