/**
 * Sales presentation routes (children of /sales/orders).
 * @summary Defines child routes for the Sales bounded context.
 * @author Student
 */
const newSalesOrder = () => import('./views/new-sales-order.vue');

/** @type {import('vue-router').RouteRecordRaw[]} */
const salesRoutes = [
    {
        path: 'new',
        name: 'new-sales-order',
        component: newSalesOrder,
        meta: { title: 'New Sales Order' }
    }
];

export default salesRoutes;
