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
    assets: (parent, {search, type}, {dataSources}) =>
      dataSources.assetsApi.search(search, type).then(x => JSON.parse(x)),
    quoteHistory: (parent, {symbol, type, range}, {dataSources}) =>
      dataSources.assetsApi.getQuoteHistory(type, symbol, range).then(x => JSON.parse(x)),
    portfolioStatistics: (parent, args, {dataSources}) =>
      dataSources.portfolioApi.getStatistics().then(x => JSON.parse(x))
  },
  Mutation: {
    buyAsset: async (_, {assetId, price, quantity}, {dataSources}) =>
      dataSources.portfolioApi.buyAsset(assetId, price, quantity).then(x => JSON.parse(x)),
    sellAsset: async (_, {assetId, price, quantity}, {dataSources}) =>
      dataSources.portfolioApi.buyAsset(assetId, price, quantity).then(x => JSON.parse(x))
  }
}
