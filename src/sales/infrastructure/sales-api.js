/**
 * HTTP adapter for the Sales bounded context.
 * @summary Wraps CRUD endpoints for customers and sales orders.
 * @author Student
 */
import { BaseApi }      from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const customersPath   = import.meta.env.VITE_CUSTOMERS_ENDPOINT_PATH;
const salesOrdersPath = import.meta.env.VITE_SALES_ORDERS_ENDPOINT_PATH;

export class SalesApi extends BaseApi {
    #customersEndpoint;
    #salesOrdersEndpoint;

    constructor() {
        super();
        this.#customersEndpoint   = new BaseEndpoint(this, customersPath);
        this.#salesOrdersEndpoint = new BaseEndpoint(this, salesOrdersPath);
    }

    getCustomers()               { return this.#customersEndpoint.getAll(); }
    getSalesOrders()             { return this.#salesOrdersEndpoint.getAll(); }
    createSalesOrder(resource)   { return this.#salesOrdersEndpoint.create(resource); }
}
