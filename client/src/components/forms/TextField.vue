<script setup lang="ts">
import { type TextFieldProps, useTextField } from '@formwerk/core';

const props = defineProps<TextFieldProps>();
const {
	inputProps,
	labelProps,
	isTouched,
	errorMessage,
	errorMessageProps,
	descriptionProps,
} = useTextField(props);

</script>

<template>
	<div>
		<div class="block">
			<label class="block text-sm font-sm text-slate-700 mb-1 pl-2" v-bind="labelProps">{{ label }}</label>
			<input v-bind="inputProps" class="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800 accent-slate-500
			focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
			disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-300 disabled:shadow-none"
			/>
		</div>
		<div v-if="errorMessage && isTouched" v-bind="errorMessageProps" class="mt-1 pl-2 text-sm text-red-600">
			{{ errorMessage }}
		</div>
		<div v-if="description" v-bind="descriptionProps" class="mt-1 pl-2 text-sm text-slate-500">
			{{ description }}
		</div>
	</div>
</template>

<style scoped>

</style>
