/**
 * Beer entity in the Brewery bounded context.
 * @summary Represents a beer product from the SampleAPI.
 * @author Student
 */
export class Beer {
    /**
     * @param {object} params
     * @param {number|null} params.id
     * @param {string} params.name
     * @param {string} params.price
     * @param {string} params.image
     * @param {object} params.rating
     * @param {string} params.beerType
     */
    constructor({ id = null, name = '', price = '$0.00', image = '', rating = {}, beerType = '' }) {
        this.id       = id;
        this.name     = name;
        this.price    = price;
        this.image    = image;
        this.rating   = rating;
        this.beerType = beerType;
    }

    /**
     * Returns the numeric price parsed from the price string (e.g. "$16.99" -> 16.99).
     * @returns {number}
     */
    get numericPrice() {
        return parseFloat(this.price.replace('$', '')) || 0;
    }
}
