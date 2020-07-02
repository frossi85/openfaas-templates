import { ApolloServer } from 'apollo-server'
import resolvers from './function/resolvers'
import typeDefs from './function/typeDefs'
import AssetsApi from './function/api/AssetsApi'
import PortfolioApi from './function/api/PortfolioApi'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            assetsApi: new AssetsApi(),
            portfolioApi: new PortfolioApi(),
        };
    },
    context: ({ req }) => ({
        headers: req.headers
    }),
    // TODO: Remove in production
    playground: true,
    introspection: true
});


//TODO: set port to 3000 to be used in openfaas

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
