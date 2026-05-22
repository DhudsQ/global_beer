<script setup>
/**
 * Sales By Partner Section component.
 * @summary Displays a grid of Sales Beer Summary cards for beers with sales orders.
 * @author Student
 */
import { computed, onMounted } from 'vue';
import { useI18n }             from 'vue-i18n';
import useSalesStore            from '../../../sales/application/sales.store.js';
import useBreweryStore          from '../../application/brewery.store.js';
import SalesBeerSummary         from './sales-beer-summary.vue';

const { t }      = useI18n();
const salesStore   = useSalesStore();
const breweryStore = useBreweryStore();

/** All unique beers that appear in at least one sales order */
const beersWithOrders = computed(() =>
    breweryStore.getBeersFromSalesOrders(salesStore.salesOrders)
);

const isLoading = computed(() =>
    !salesStore.salesOrdersLoaded || !breweryStore.alesLoaded || !breweryStore.stoutsLoaded
);

onMounted(() => {
    if (!salesStore.salesOrdersLoaded) salesStore.fetchSalesOrders();
    if (!breweryStore.alesLoaded)      breweryStore.fetchAles();
    if (!breweryStore.stoutsLoaded)    breweryStore.fetchStouts();
});
</script>

<template>
  <section aria-labelledby="sales-by-partner-title">
    <h2 id="sales-by-partner-title">{{ t('home.sales-by-partner') }}</h2>

    <div v-if="isLoading" class="flex justify-content-center p-4" aria-live="polite" aria-label="Loading sales data">
      <i class="pi pi-spin pi-spinner text-4xl text-primary" aria-hidden="true" />
    </div>

    <div v-else class="grid" role="list">
      <div
        v-for="beer in beersWithOrders"
        :key="beer.id"
        class="col-12 md:col-6"
        role="listitem"
      >
        <sales-beer-summary :beer="beer" />
      </div>

      <div v-if="beersWithOrders.length === 0" class="col-12 text-color-secondary font-italic p-4">
        {{ t('home.no-sales-data') }}
      </div>
    </div>
  </section>
</template>
