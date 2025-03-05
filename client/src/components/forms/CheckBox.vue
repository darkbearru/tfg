<script lang="ts" setup>
import { type CheckboxProps, useCheckbox } from "@formwerk/core";

const props = defineProps<CheckboxProps>();

const { labelProps, inputProps, isChecked } = useCheckbox(props);
</script>

<template>
  <div class="block">
    <label
      v-bind="labelProps"
      class="group inline-flex items-center w-max select-none text-sm text-slate-700 mb-1"
    >
      <input v-bind="inputProps" class="sr-only peer" />
      <span
        class="checkbox-square flex items-center justify-center w-4 h-4 mr-2 bg-slate-50 border border-slate-300 rounded overflow-hidden peer-checked:bg-slate-800 peer-checked:border-slate-800"
      >
        <svg
          v-if="isChecked"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          :class="isChecked ? 'fill-slate-50' : 'fill-slate-800'"
        >
          <path
            d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"
          ></path>
        </svg>
      </span>
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>