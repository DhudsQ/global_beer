/**
 * Shared Axios client factory.
 * @summary Base class that owns the configured Axios instance.
 * @author Student
 */
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export class BaseApi {
    /** @type {import('axios').AxiosInstance} */
    #http;

    constructor(baseURL = apiUrl) {
        this.#http = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }

    /** @returns {import('axios').AxiosInstance} */
    get http() { return this.#http; }
}
