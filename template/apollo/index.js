"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./function/resolvers"));
const typeDefs_1 = __importDefault(require("./function/typeDefs"));
const dataSources_1 = __importDefault(require("./function/dataSources"));
const apollo_server_plugin_response_cache_1 = __importDefault(require("apollo-server-plugin-response-cache"));
const additionalServerConfiguration_1 = __importDefault(require("./function/additionalServerConfiguration"));
const server = new apollo_server_1.ApolloServer(Object.assign({ typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default, dataSources: () => dataSources_1.default, context: ({ req }) => ({
        headers: req.headers
    }), plugins: [apollo_server_plugin_response_cache_1.default()] }, additionalServerConfiguration_1.default));
server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
