import AssetsApi from './api/AssetsApi'
import PortfolioApi from './api/PortfolioApi'
import CurrencyApi from './api/CurrencyApi'

export default {
  assetsApi: new AssetsApi(),
  portfolioApi: new PortfolioApi(),
  currencyApi: new CurrencyApi()
}
