<script setup lang="ts">

defineProps<{
	href: string,
	title?: string,
}>()
</script>


<template>
	<a :href="href" :title="title" class="px-6 py-1 rounded border text-slate-500 border-slate-300 hover:text-indigo-700 hover:border-indigo-600">
		<slot />
	</a>
</template>

<style scoped>

</style>