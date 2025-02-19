<script setup lang="ts">
interface InputItemProps {
  name: string,
  label?: string,
  type?: string,
  required?: boolean,
  placeholder?: string,
}
const { name, label = "", type = "text", required = false, placeholder = ""} = defineProps<InputItemProps>()
const value = defineModel();

</script>

<template>
  <div>
    <label class="block">
      <span class="block text-sm font-sm text-slate-700">{{ label }}</span>
      <input class="w-full mb-4 p-1 bg-slate-50 border border-slate-300 rounded text-slate-800 accent-slate-500
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-300 disabled:shadow-none"
             :name="name"
             :id="name"
             :type="type"
             :required="required"
             v-model="value"
             :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<style scoped>

</style>
