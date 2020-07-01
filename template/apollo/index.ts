/*
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './function/typeDefs'
import resolvers from './function/resolvers'

const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // TODO: Remove in production
    playground: true,
    introspection: true
});

app.disable('x-powered-by')
app.use(express.json());

const port = process.env.http_port || 3000

server.applyMiddleware({ app })

app.listen(port, () => {
    console.log(`OpenFaaS Node.js listening on port: ${port}`)
})

*/



const { ApolloServer, gql } = require('apollo-server');


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    enum AssetType {
        Stock
        Future
        Bond
        Securities
        InternationalStock
        Check
        Option
        TreasuryBills
        FixedIncomeSecurities
        Mocked
    }

    type CompanyMetadata {
        ceo: String
        headQuarters: String
        foundedAt: Int
        employees: Int
    }

    type AnotherMetadata {
        other: String
    }

    union AssetMetadata = CompanyMetadata | AnotherMetadata

    type Asset {
        friendlyName: String
        description: String
        market: String
        symbol: String
        currency: String
        type: AssetType
        logo: String
        metadata: AssetMetadata
    }

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        assets(term: String!, type: AssetType): [Asset]
    }
`;


import { services, models } from "@inverti-facil/core";


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    AssetMetadata: {
        __resolveType(obj, context, info){
            if(obj.other){
                return 'AnotherMetadata';
            }

            if(obj.ceo){
                return 'CompanyMetadata';
            }

            return null;
        },
    },
    Query: {
        assets: async (parent, args, context, info) => {
            const assetService = await services.AssetService.asAdmin()

            console.log(args.term, args.type)

            const assets = await assetService.getAssets(args.term, args.type)

            console.log(assets)

            return assets
        }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // TODO: Remove in production
    playground: true,
    introspection: true
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
