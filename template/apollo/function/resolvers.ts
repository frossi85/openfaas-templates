import 'apollo-cache-control'

// Resolvers define the technique for fetching the types defined in the
export default {
  AssetMetadata: {
    __resolveType(obj, context, info) {
      if (obj.other) {
        return 'AnotherMetadata'
      }

      if (obj.ceo) {
        return 'CompanyMetadata'
      }

      return null
    },
  },
  Query: {
    assets: (parent, {search, type}, {dataSources}, info) => {
      info.cacheControl.setCacheHint({ maxAge: 30 * 60 })
      return dataSources.assetsApi.search(search, type).then(x => JSON.parse(x))
    },
    quoteHistory: (parent, {symbol, type, range}, {dataSources}, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60 })
      return dataSources.assetsApi.getQuoteHistory(type, symbol, range).then(x => JSON.parse(x))
    },
    portfolioStatistics: (parent, args, {dataSources}, info) => {
      info.cacheControl.setCacheHint({maxAge: 60 })
      return dataSources.portfolioApi.getStatistics().then(x => JSON.parse(x))
    }
  },
  Mutation: {
    buyAsset: async (_, {assetId, advertisedPrice, quantity}, {dataSources}) =>
      dataSources.portfolioApi.buyAsset(assetId, advertisedPrice, quantity).then(x => JSON.parse(x)),
    sellAsset: async (_, {assetId, advertisedPrice, quantity}, {dataSources}) =>
      dataSources.portfolioApi.sellAsset(assetId, advertisedPrice, quantity).then(x => JSON.parse(x))
  }
}
