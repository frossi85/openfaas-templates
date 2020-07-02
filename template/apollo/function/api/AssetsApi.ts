import InvertiFacilDataSource from './InvertiFacilDataSource'

class AssetsApi extends InvertiFacilDataSource {
  async search(term, type) {
    return this.post('search-assets', {term, type})
  }

  async getQuoteHistory(type, symbol, range) {
    return this.post('get-asset-quote-history', {type, symbol, range})
  }
}


