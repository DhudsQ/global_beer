<script setup>
/**
 * New Sales Order view.
 * @summary Allows a user to register a new sales order for a customer and beer.
 * @author Student
 */
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n }     from 'vue-i18n';
import { useRouter }   from 'vue-router';
import { useToast }    from 'primevue/usetoast';
import useSalesStore   from '../../application/sales.store.js';
import useBreweryStore from '../../../brewery/application/brewery.store.js';

const { t }      = useI18n();
const router     = useRouter();
const toast      = useToast();
const salesStore   = useSalesStore();
const breweryStore = useBreweryStore();

/** Form state */
const selectedCustomerId = ref(null);
const selectedBeerType   = ref(null);
const selectedBeerId     = ref(null);
const quantity           = ref(null);
const isSubmitting       = ref(false);

const beerTypeOptions = [
    { label: 'Ale',   value: 'ale' },
    { label: 'Stout', value: 'stouts' }
];

/** Customer dropdown options */
const customerOptions = computed(() =>
    salesStore.customers.map(c => ({ label: c.name, value: c.id }))
);

/** Beer options filtered by selected type */
const beerOptions = computed(() => {
    if (!selectedBeerType.value) return [];
    return breweryStore.getBeersByType(selectedBeerType.value)
        .map(b => ({ label: b.name, value: b.id }));
});

/** The selected Beer entity */
const selectedBeer = computed(() => {
    if (!selectedBeerId.value || !selectedBeerType.value) return null;
    return breweryStore.getBeerById(selectedBeerId.value, selectedBeerType.value);
});

/** Unit price derived from selected beer */
const unitPrice = computed(() => selectedBeer.value ? selectedBeer.value.numericPrice : 0);

/** Reset beer selection when type changes */
watch(selectedBeerType, () => { selectedBeerId.value = null; });

/** Validation: quantity must be > 0 and < 1500 */
const isQuantityValid = computed(() =>
    quantity.value !== null && quantity.value > 0 && quantity.value < 1500
);

const canSubmit = computed(() =>
    selectedCustomerId.value !== null &&
    selectedBeerType.value !== null &&
    selectedBeerId.value !== null &&
    isQuantityValid.value
);

onMounted(() => {
    if (!salesStore.customersLoaded)   salesStore.fetchCustomers();
    if (!breweryStore.alesLoaded)      breweryStore.fetchAles();
    if (!breweryStore.stoutsLoaded)    breweryStore.fetchStouts();
});

/** Submits the new sales order */
async function create() {
    if (!canSubmit.value) return;
    isSubmitting.value = true;
    try {
        const order = {
            customerId:   selectedCustomerId.value,
            beerType:     selectedBeerType.value,
            beerId:       selectedBeerId.value,
            beerName:     selectedBeer.value.name,
            unitPrice:    unitPrice.value,
            quantity:     quantity.value,
            registeredAt: new Date().toISOString()
        };
        await salesStore.createSalesOrder(order);
        toast.add({ severity: 'success', summary: t('toast.success-title'), detail: t('toast.create-success'), life: 3000 });
        router.push({ name: 'home' });
    } catch (error) {
        toast.add({ severity: 'error', summary: t('toast.error-title'), detail: t('toast.create-error'), life: 4000 });
    } finally {
        isSubmitting.value = false;
    }
}

function cancel() { router.push({ name: 'home' }); }
</script>

<template>
  <div class="p-4" role="main" aria-labelledby="new-order-title">
    <h1 id="new-order-title">{{ t('new-sales-order.title') }}</h1>
    <h3 class="font-italic text-color-secondary mt-0 mb-4">
      <em>{{ t('new-sales-order.subtitle') }}</em>
    </h3>

    <!-- Customer -->
    <div class="field mb-4">
      <label for="customer-select" class="block mb-1 font-semibold">
        {{ t('new-sales-order.select-customer') }}
      </label>
      <pv-select
        id="customer-select"
        v-model="selectedCustomerId"
        :options="customerOptions"
        option-label="label"
        option-value="value"
        :placeholder="t('new-sales-order.customer-placeholder')"
        :loading="!salesStore.customersLoaded"
        class="w-full md:w-6"
        aria-label="Select customer"
      />
    </div>

    <!-- Beer Type -->
    <div class="field mb-4">
      <label for="beer-type-select" class="block mb-1 font-semibold">
        {{ t('new-sales-order.select-beer-type') }}
      </label>
      <pv-select
        id="beer-type-select"
        v-model="selectedBeerType"
        :options="beerTypeOptions"
        option-label="label"
        option-value="value"
        :placeholder="t('new-sales-order.beer-type-placeholder')"
        class="w-full md:w-6"
        aria-label="Select beer type"
      />
    </div>

    <!-- Beer Name -->
    <div class="field mb-4">
      <label for="beer-select" class="block mb-1 font-semibold">
        {{ t('new-sales-order.select-beer') }}
      </label>
      <pv-select
        id="beer-select"
        v-model="selectedBeerId"
        :options="beerOptions"
        option-label="label"
        option-value="value"
        :placeholder="t('new-sales-order.beer-placeholder')"
        :disabled="!selectedBeerType"
        :loading="selectedBeerType === 'ale' ? !breweryStore.alesLoaded : (selectedBeerType === 'stouts' ? !breweryStore.stoutsLoaded : false)"
        class="w-full md:w-6"
        aria-label="Select beer"
      />
    </div>

    <!-- Unit Price (read-only) -->
    <div v-if="selectedBeer" class="field mb-4">
      <label class="block mb-1 font-semibold">{{ t('new-sales-order.unit-price') }}</label>
      <span class="text-lg font-bold text-primary" aria-label="Unit price">
        {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(unitPrice) }}
      </span>
    </div>

    <!-- Quantity -->
    <div class="field mb-4">
      <label for="quantity-input" class="block mb-1 font-semibold">
        {{ t('new-sales-order.quantity') }}
      </label>
      <input
        id="quantity-input"
        v-model.number="quantity"
        type="number"
        min="1"
        max="1499"
        class="p-inputtext p-component w-full md:w-6"
        :placeholder="t('new-sales-order.quantity-placeholder')"
        aria-label="Quantity (must be between 1 and 1499)"
      />
      <small v-if="quantity !== null && !isQuantityValid" class="text-red-500 block mt-1" role="alert">
        {{ t('new-sales-order.quantity-validation') }}
      </small>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 mt-4" role="group" aria-label="Form actions">
      <pv-button
        :label="t('new-sales-order.create')"
        icon="pi pi-check"
        :disabled="!canSubmit || isSubmitting"
        :loading="isSubmitting"
        @click="create"
        aria-label="Create sales order"
      />
      <pv-button
        :label="t('new-sales-order.cancel')"
        icon="pi pi-times"
        severity="secondary"
        @click="cancel"
        aria-label="Cancel and return to home"
      />
    </div>
  </div>
</template>
