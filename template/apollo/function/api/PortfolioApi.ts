import InvertiFacilDataSource from './InvertiFacilDataSource'

export default class PortfolioApi extends InvertiFacilDataSource {
  async getStatistics() {
    return this.post('get-portfolio-statistics')
  }

  async buyAsset(assetId, price, quantity) {
    return this.post('buy-asset', {assetId, price, quantity})
  }

  async sellAsset(assetId, price, quantity) {
    return this.post('sell-asset', {assetId, price, quantity})
  }
}
