/**
 * Maps sales-order resources into domain entities.
 * @summary Assembler for SalesOrder resources.
 * @author Student
 */
import { SalesOrder } from '../domain/model/sales-order.entity.js';

export class SalesOrderAssembler {
    /**
     * @param {object} resource
     * @returns {SalesOrder}
     */
    static toEntityFromResource(resource) {
        return new SalesOrder({ ...resource });
    }

    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {SalesOrder[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) { console.error(response.status, response.statusText); return []; }
        const resources = Array.isArray(response.data) ? response.data : response.data['sales-orders'];
        return resources.map(r => this.toEntityFromResource(r));
    }
}
