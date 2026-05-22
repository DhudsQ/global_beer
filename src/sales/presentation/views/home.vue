<script setup>
/**
 * Home view.
 * @summary Displays the main dashboard with the Sales by Partner section.
 * @author Student
 */
import { useI18n }           from 'vue-i18n';
import SalesByPartnerSection from '../../../brewery/presentation/components/sales-by-partner-section.vue';

const { t } = useI18n();
</script>

<template>
  <div class="p-4" role="main" aria-label="Home">
    <h1>{{ t('home.title') }}</h1>
    <p class="text-lg mb-4">{{ t('home.content') }}</p>
    <sales-by-partner-section />
  </div>
</template>
