/**
 * Customer entity in the Sales bounded context.
 * @summary Represents a retail customer that places sales orders.
 * @author Student
 */
export class Customer {
    /**
     * @param {object} params
     * @param {number|null} params.id
     * @param {string} params.name
     * @param {string} params.email
     * @param {string} params.address
     */
    constructor({ id = null, name = '', email = '', address = '' }) {
        this.id      = id;
        this.name    = name;
        this.email   = email;
        this.address = address;
    }
}
