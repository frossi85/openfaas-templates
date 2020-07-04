import {ApolloServer} from 'apollo-server'
import resolvers from './function/resolvers'
import typeDefs from './function/typeDefs'
import dataSources from './function/dataSources'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import additionalServerConfiguration from './function/additionalServerConfiguration'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
  context: ({req}) => ({
    headers: req.headers
  }),
  plugins: [responseCachePlugin()],
  ...additionalServerConfiguration
})

const port = process.env.http_port || 3000;

// The `listen` method launches a web server.
server.listen({ port }).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
