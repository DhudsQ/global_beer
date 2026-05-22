<script setup>
import { useI18n }      from 'vue-i18n';
import LanguageSwitcher from './language-switcher.vue';
import { LogoDevApi }   from '../../infrastructure/logo-dev-api.js';

const { t } = useI18n();

const logoApi = new LogoDevApi();
const logoUrl = logoApi.getUrlToLogo('https://globalbeer.com');

const navItems = [
    { label: 'nav.home',           to: '/home' },
    { label: 'nav.new-sales-order', to: '/sales/orders/new' }
];
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <header class="app-header" role="banner">
    <pv-toolbar class="bg-primary px-3">
      <template #start>
        <img
          :src="logoUrl"
          alt="Global Beer Network logo"
          height="36"
          class="mr-2"
          style="border-radius:4px; background:white; padding:3px;"
          aria-label="Global Beer Network company logo"
        />
        <span class="font-bold text-white text-base hidden md:inline">
          Exclusive U.S. importer of award-winning breweries
        </span>
      </template>

      <template #center>
        <div class="flex gap-2">
          <pv-button v-for="item in navItems" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ t(item.label) }}</router-link>
          </pv-button>
        </div>
      </template>

      <template #end>
        <language-switcher />
      </template>
    </pv-toolbar>
  </header>

  <main class="main-content" role="main">
    <router-view />
  </main>
</template>

<style scoped>
.app-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.main-content {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
}
</style>
