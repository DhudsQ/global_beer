<script setup>
/**
 * Sales Beer Summary component.
 * @summary Displays a card with beer info and its associated sales orders summary.
 * @author Student
 */
import { computed } from 'vue';
import { useI18n }  from 'vue-i18n';
import useSalesStore from '../../../sales/application/sales.store.js';

const props = defineProps({
    /** @type {import('../../domain/model/beer.entity.js').Beer} */
    beer: { type: Object, required: true }
});

const { t } = useI18n();
const salesStore = useSalesStore();

const orders = computed(() => salesStore.getOrdersByBeerId(props.beer.id));

const totalSalesAmount = computed(() =>
    orders.value.reduce((sum, o) => sum + (o.quantity * o.unitPrice), 0)
);

/**
 * Formats a number as USD currency.
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
</script>

<template>
  <pv-card class="h-full" :aria-label="`Sales summary for ${beer.name}`">
    <template #header>
      <img
        :src="beer.image"
        :alt="beer.name"
        class="w-full"
        style="height: 180px; object-fit: cover;"
        aria-hidden="true"
      />
    </template>

    <template #title>{{ beer.name }}</template>

    <template #content>
      <div v-if="orders.length > 0">
        <div
          v-for="order in orders"
          :key="order.id"
          class="flex justify-content-between align-items-center mb-2 border-bottom-1 surface-border pb-1"
          :aria-label="`Order: unit price ${order.unitPrice}, quantity ${order.quantity}`"
        >
          <span class="text-sm">
            <span class="font-semibold">{{ t('sales-order.unit-price') }}:</span>
            {{ formatCurrency(order.unitPrice) }}
          </span>
          <span class="text-sm">
            <span class="font-semibold">{{ t('sales-order.quantity') }}:</span>
            {{ order.quantity }}
          </span>
        </div>
      </div>
      <div v-else class="text-color-secondary font-italic" aria-label="No orders registered">
        {{ t('sales-beer-summary.no-orders') }}
      </div>
    </template>

    <template #footer>
      <div class="flex justify-content-between align-items-center">
        <span class="font-semibold">{{ t('sales-beer-summary.total-sales') }}:</span>
        <span class="text-primary font-bold text-lg">{{ formatCurrency(totalSalesAmount) }}</span>
      </div>
    </template>
  </pv-card>
</template>
