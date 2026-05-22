/**
 * HTTP adapter for the Brewery bounded context.
 * @summary Wraps endpoints from the SampleAPI beers service.
 * @author Student
 */
import { BaseApi }      from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const breweryBaseUrl = import.meta.env.VITE_BREWERY_API_BASE_URL;

export class BreweryApi extends BaseApi {
    #aleEndpoint;
    #stoutsEndpoint;

    constructor() {
        super(breweryBaseUrl);
        this.#aleEndpoint    = new BaseEndpoint(this, '/ale');
        this.#stoutsEndpoint = new BaseEndpoint(this, '/stouts');
    }

    /**
     * Fetches beers by type.
     * @param {string} beerType - 'ale' or 'stouts'
     * @returns {Promise}
     */
    getBeersByType(beerType) {
        if (beerType === 'ale')    return this.#aleEndpoint.getAll();
        if (beerType === 'stouts') return this.#stoutsEndpoint.getAll();
        return Promise.reject(new Error(`Unknown beer type: ${beerType}`));
    }
}
