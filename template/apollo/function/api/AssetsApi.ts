import InvertiFacilDataSource from './InvertiFacilDataSource'

export default class AssetsApi extends InvertiFacilDataSource {
  search(search, type) {
    return this.post('search-assets', {search, type})
  }

  async getQuoteHistory(type, symbol, range) {
    return this.post('get-asset-quote-history', {type, symbol, range})
  }
}


