import { services, models, Configuration, graphql } from "@inverti-facil/core";

// Resolvers define the technique for fetching the types defined in the
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
        assets: (parent, {search, type}, { dataSources }) =>
          dataSources.assetsApi.search(search, type),
        quoteHistory: (parent, {symbol, type, range}, { dataSources }) =>
          dataSources.assetsApi.getQuoteHistory(type, symbol, range),
        portfolioStatistics: (parent, args, { dataSources }) =>
          dataSources.portfolioApi.getStatistics()
    },
    Mutation: {
        buyAsset: async (_, { assetId, price, quantity }, { dataSources }) =>
          dataSources.portfolioApi.buyAsset(assetId, price, quantity),
        sellAsset: async (_, { assetId, price, quantity }, { dataSources }) =>
          dataSources.portfolioApi.buyAsset(assetId, price, quantity)
    }
}

export default resolvers
