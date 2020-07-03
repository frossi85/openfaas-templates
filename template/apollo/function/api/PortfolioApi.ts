import InvertiFacilDataSource from './InvertiFacilDataSource'

export default class PortfolioApi extends InvertiFacilDataSource {
  async getStatistics() {
    return this.post('get-portfolio-statistics')
  }

  async buyAsset(assetId, advertisedPrice, quantity) {
    return this.post('buy-asset', {assetId, advertisedPrice, quantity})
  }

  async sellAsset(assetId, advertisedPrice, quantity) {
    return this.post('sell-asset', {assetId, advertisedPrice, quantity})
  }
}
