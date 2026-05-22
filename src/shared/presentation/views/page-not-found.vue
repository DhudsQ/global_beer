<script setup>
import { useI18n }   from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t }   = useI18n();
const route   = useRoute();
const router  = useRouter();
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center p-6 text-center" role="main" aria-label="Page not found">
    <i class="pi pi-exclamation-circle text-6xl text-red-400 mb-4" aria-hidden="true" />
    <h1 class="text-4xl mb-3">{{ t('page-not-found.title') }}</h1>
    <p class="text-lg mb-4">{{ t('page-not-found.content', { path: route.path }) }}</p>
    <pv-button
      :label="t('page-not-found.go-home')"
      icon="pi pi-home"
      @click="router.push('/home')"
      aria-label="Return to home page"
    />
  </div>
</template>
