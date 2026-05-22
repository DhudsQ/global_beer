/**
 * Maps beer resources into domain entities.
 * @summary Assembler for Beer resources from SampleAPI.
 * @author Student
 */
import { Beer } from '../domain/model/beer.entity.js';

export class BeerAssembler {
    /**
     * @param {object} resource
     * @param {string} beerType
     * @returns {Beer}
     */
    static toEntityFromResource(resource, beerType = '') {
        return new Beer({ ...resource, beerType });
    }

    /**
     * @param {import('axios').AxiosResponse} response
     * @param {string} beerType
     * @returns {Beer[]}
     */
    static toEntitiesFromResponse(response, beerType = '') {
        if (response.status !== 200) { console.error(response.status, response.statusText); return []; }
        const resources = Array.isArray(response.data) ? response.data : [];
        return resources.map(r => this.toEntityFromResource(r, beerType));
    }
}
