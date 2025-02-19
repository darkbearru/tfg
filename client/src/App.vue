<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts'
const auth = useAuthStore();
</script>

<template>
  <header>
    <div class="wrapper">
<!--
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/main">Main</RouterLink>
      </nav>
-->
      <button v-if="auth.isLoggedIn">Logout</button>
    </div>
  </header>
  <div class="w-screen h-screen flex justify-center items-center">
    <RouterView />
  </div>
</template>

<style scoped lang="postcss">

</style>
