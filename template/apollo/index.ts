import {ApolloServer} from 'apollo-server'
import resolvers from './function/resolvers'
import typeDefs from './function/typeDefs'
import dataSources from './function/dataSources'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
  context: ({req}) => ({
    headers: req.headers
  }),
  // TODO: Remove in production
  playground: true,
  introspection: true
})


//TODO: set port to 3000 to be used in openfaas

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
