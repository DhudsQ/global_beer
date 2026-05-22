/**
 * Application service store for the Brewery bounded context.
 * @summary Coordinates retrieval of beer information from SampleAPI.
 * @author Student
 */
import { defineStore }   from 'pinia';
import { ref }           from 'vue';
import { BreweryApi }    from '../infrastructure/brewery-api.js';
import { BeerAssembler } from '../infrastructure/beer.assembler.js';

const breweryApi = new BreweryApi();

const useBreweryStore = defineStore('brewery', () => {
    /** @type {import('vue').Ref<import('../domain/model/beer.entity.js').Beer[]>} */
    const ales         = ref([]);
    /** @type {import('vue').Ref<import('../domain/model/beer.entity.js').Beer[]>} */
    const stouts       = ref([]);
    const errors       = ref([]);
    const alesLoaded   = ref(false);
    const stoutsLoaded = ref(false);

    function fetchAles() {
        breweryApi.getBeersByType('ale')
            .then(r  => { ales.value = BeerAssembler.toEntitiesFromResponse(r, 'ale'); alesLoaded.value = true; })
            .catch(e => errors.value.push(e));
    }

    function fetchStouts() {
        breweryApi.getBeersByType('stouts')
            .then(r  => { stouts.value = BeerAssembler.toEntitiesFromResponse(r, 'stouts'); stoutsLoaded.value = true; })
            .catch(e => errors.value.push(e));
    }

    /**
     * Returns beers for the given type.
     * @param {string} beerType
     * @returns {import('../domain/model/beer.entity.js').Beer[]}
     */
    function getBeersByType(beerType) {
        if (beerType === 'ale')    return ales.value;
        if (beerType === 'stouts') return stouts.value;
        return [];
    }

    /**
     * Returns a beer entity by id and type.
     * @param {number} id
     * @param {string} beerType
     * @returns {import('../domain/model/beer.entity.js').Beer|undefined}
     */
    function getBeerById(id, beerType) {
        return getBeersByType(beerType).find(b => b.id === id);
    }

    /**
     * Returns all unique beers that appear in sales orders.
     * @param {import('../../sales/domain/model/sales-order.entity.js').SalesOrder[]} salesOrders
     * @returns {import('../domain/model/beer.entity.js').Beer[]}
     */
    function getBeersFromSalesOrders(salesOrders) {
        const seen = new Set();
        const result = [];
        salesOrders.forEach(order => {
            if (!seen.has(order.beerId)) {
                seen.add(order.beerId);
                const beer = getBeerById(order.beerId, order.beerType);
                if (beer) result.push(beer);
            }
        });
        return result;
    }

    return {
        ales, stouts, errors, alesLoaded, stoutsLoaded,
        fetchAles, fetchStouts, getBeersByType, getBeerById, getBeersFromSalesOrders
    };
});

export default useBreweryStore;
