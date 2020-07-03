"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./function/resolvers"));
const typeDefs_1 = __importDefault(require("./function/typeDefs"));
const dataSources_1 = __importDefault(require("./function/dataSources"));
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    dataSources: () => dataSources_1.default,
    context: ({ req }) => ({
        headers: req.headers
    }),
    playground: true,
    introspection: true
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
