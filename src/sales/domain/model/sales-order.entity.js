/**
 * SalesOrder entity in the Sales bounded context.
 * @summary Represents a sales order placed by a customer for a beer product.
 * @author Student
 */
export class SalesOrder {
    /**
     * @param {object} params
     * @param {number|null} params.id
     * @param {number|null} params.customerId
     * @param {string} params.beerType
     * @param {number|null} params.beerId
     * @param {string} params.beerName
     * @param {number} params.unitPrice
     * @param {number} params.quantity
     * @param {string|null} params.registeredAt
     */
    constructor({ id = null, customerId = null, beerType = '', beerId = null,
                  beerName = '', unitPrice = 0, quantity = 0, registeredAt = null }) {
        this.id           = id;
        this.customerId   = customerId;
        this.beerType     = beerType;
        this.beerId       = beerId;
        this.beerName     = beerName;
        this.unitPrice    = unitPrice;
        this.quantity     = quantity;
        this.registeredAt = registeredAt;
    }

    /**
     * Calculates the total amount for this order.
     * @returns {number}
     */
    get totalAmount() {
        return this.quantity * this.unitPrice;
    }
}
