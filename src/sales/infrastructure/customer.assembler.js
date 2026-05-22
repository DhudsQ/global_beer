/**
 * Maps customer resources into domain entities.
 * @summary Assembler for Customer resources.
 * @author Student
 */
import { Customer } from '../domain/model/customer.entity.js';

export class CustomerAssembler {
    /**
     * @param {object} resource
     * @returns {Customer}
     */
    static toEntityFromResource(resource) {
        return new Customer({ ...resource });
    }

    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {Customer[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) { console.error(response.status, response.statusText); return []; }
        const resources = Array.isArray(response.data) ? response.data : response.data['customers'];
        return resources.map(r => this.toEntityFromResource(r));
    }
}
