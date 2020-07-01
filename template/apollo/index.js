"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql `
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
const core_1 = require("@inverti-facil/core");
const resolvers = {
    AssetMetadata: {
        __resolveType(obj, context, info) {
            if (obj.other) {
                return 'AnotherMetadata';
            }
            if (obj.ceo) {
                return 'CompanyMetadata';
            }
            return null;
        },
    },
    Query: {
        assets: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            const assetService = yield core_1.services.AssetService.asAdmin();
            console.log(args.term, args.type);
            const assets = yield assetService.getAssets(args.term, args.type);
            console.log(assets);
            return assets;
        })
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
