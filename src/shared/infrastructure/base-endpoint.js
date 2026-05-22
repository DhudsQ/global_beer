/**
 * Generic CRUD endpoint adapter.
 * @summary Provides getAll, getById, create, update and delete over a given path.
 * @author Student
 */
export class BaseEndpoint {
    /**
     * @param {import('./base-api.js').BaseApi} baseApi
     * @param {string} endpointPath
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    getAll()             { return this.http.get(this.endpointPath); }
    getById(id)          { return this.http.get(`${this.endpointPath}/${id}`); }
    create(resource)     { return this.http.post(this.endpointPath, resource); }
    update(id, resource) { return this.http.put(`${this.endpointPath}/${id}`, resource); }
    delete(id)           { return this.http.delete(`${this.endpointPath}/${id}`); }
}
