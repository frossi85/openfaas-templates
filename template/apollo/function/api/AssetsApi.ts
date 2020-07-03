import InvertiFacilDataSource from './InvertiFacilDataSource'

export default class AssetsApi extends InvertiFacilDataSource {
  search(search, type) {
    return this.post('search-assets', {search, type})
    /*

    const result = await this.post('search-assets', {search, type})

    console.log('@@@@ search',result)

    return result

     */
  }

  async getQuoteHistory(type, symbol, range) {
    return this.post('get-asset-quote-history', {type, symbol, range})
  }
}


