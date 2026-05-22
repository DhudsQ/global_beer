/**
 * Application service store for the Sales bounded context.
 * @summary Coordinates use cases for customers and sales orders.
 * @author Student
 */
import { defineStore }           from 'pinia';
import { ref }                   from 'vue';
import { SalesApi }              from '../infrastructure/sales-api.js';
import { CustomerAssembler }     from '../infrastructure/customer.assembler.js';
import { SalesOrderAssembler }   from '../infrastructure/sales-order.assembler.js';

const salesApi = new SalesApi();

const useSalesStore = defineStore('sales', () => {
    /** @type {import('vue').Ref<import('../domain/model/customer.entity.js').Customer[]>} */
    const customers         = ref([]);
    /** @type {import('vue').Ref<import('../domain/model/sales-order.entity.js').SalesOrder[]>} */
    const salesOrders       = ref([]);
    const errors            = ref([]);
    const customersLoaded   = ref(false);
    const salesOrdersLoaded = ref(false);

    function fetchCustomers() {
        salesApi.getCustomers()
            .then(r  => { customers.value = CustomerAssembler.toEntitiesFromResponse(r); customersLoaded.value = true; })
            .catch(e => errors.value.push(e));
    }

    function fetchSalesOrders() {
        salesApi.getSalesOrders()
            .then(r  => { salesOrders.value = SalesOrderAssembler.toEntitiesFromResponse(r); salesOrdersLoaded.value = true; })
            .catch(e => errors.value.push(e));
    }

    /**
     * Creates a new sales order and synchronises local state.
     * @param {import('../domain/model/sales-order.entity.js').SalesOrder} order
     * @returns {Promise<void>}
     */
    async function createSalesOrder(order) {
        const response = await salesApi.createSalesOrder(order);
        const created  = SalesOrderAssembler.toEntityFromResource(response.data);
        salesOrders.value.push(created);
    }

    /**
     * Returns all sales orders filtered by beer id.
     * @param {number} beerId
     * @returns {import('../domain/model/sales-order.entity.js').SalesOrder[]}
     */
    function getOrdersByBeerId(beerId) {
        return salesOrders.value.filter(o => o.beerId === beerId);
    }

    /**
     * Calculates the total sales amount for a given beer.
     * @param {number} beerId
     * @returns {number}
     */
    function getTotalSalesByBeerId(beerId) {
        return getOrdersByBeerId(beerId).reduce((sum, o) => sum + (o.quantity * o.unitPrice), 0);
    }

    return {
        customers, salesOrders, errors, customersLoaded, salesOrdersLoaded,
        fetchCustomers, fetchSalesOrders, createSalesOrder,
        getOrdersByBeerId, getTotalSalesByBeerId
    };
});

export default useSalesStore;
