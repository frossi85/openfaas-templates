"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const lodash_1 = require("lodash");
class InvertiFacilDataSource extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'https://frossi85.invertifacil.com.ar';
    }
    willSendRequest(request) {
        const headersToTransfer = ['Authorization', 'x-admin-api-key', 'x-with-user-id', 'x-backend-api-key'];
        request.headers.set('Content-Type', 'application/json');
        lodash_1.toPairs(this.context.headers)
            .filter(([key]) => headersToTransfer.includes(key))
            .map(([key, value]) => request.headers.set(key, value));
    }
}
exports.default = InvertiFacilDataSource;
