import InvertiFacilDataSource from './InvertiFacilDataSource'

export default class CurrencyApi extends InvertiFacilDataSource {
  async getPrices(market) {
    return this.post('get-currency-price', {market})
  }

  async exchangeCurrency(operation, market, from, to, amount) {
    return this.post('https://frossi85.invertifacil.com.ar/exchange-currency', {operation, market, from, to, amount})
  }
}


