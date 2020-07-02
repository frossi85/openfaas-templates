import { ApolloServer, gql } from 'apollo-server'
import resolvers from './function/resolvers'
import typeDefs from './function/typeDefs'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // TODO: Remove in production
    playground: true,
    introspection: true
});


//TODO: set port to 3000 to be used in openfaas

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
