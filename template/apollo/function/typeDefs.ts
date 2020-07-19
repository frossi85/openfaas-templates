import {gql} from 'apollo-server'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    enum IAssetType {
        Stock
        Future
        Bond
        Securities
        InternationalStock
        Check
        Option
        TreasuryBills
        FixedIncomeSecurities
        Unknown
    }

    enum QuoteRange {
        FiveDays
        OneDay
        OneMonth
        ThreeMonths
        SixMonths
        OneYear
        FiveYear
    }

    type CompanyMetadata {
        ceo: String
        headQuarters: String
        foundedAt: Int
        employees: Int
    }

    type AnotherMetadata {
        other: String
    }

    union AssetMetadata = CompanyMetadata | AnotherMetadata

    type IAsset {
        friendlyName: String
        description: String
        market: String
        symbol: String
        currency: String
        type: IAssetType
        logo: String
        metadata: AssetMetadata
    }

    type IAssetQuote {
        market: String
        symbol: String
        currency: String
        price: Float
        open: Float
        close: Float
        high: Float
        down: Float
        volume: Float
        averageVolume: Float
        marketCap: Float
        fiftyTwoWeeksHigh: Float
        fiftyTwoWeeksLow: Float
        peRatio: Float
        bid: Float
        ask: Float
        openInterest: Float
        indexValue: Float
        settlement: Float
    }

    type AssetVariation {
        percentage: Float
        absolute: Float
    }

    type AssetDateTimePrice {
        open: Float
        close: Float
        volume: Float
        high: Float
        low: Float
        timestamp: Int
    }

    type IAssetQuoteHistory {
        market: String
        symbol: String
        currency: String
        price: Float
        priceHistory: [AssetDateTimePrice]
        todayVariation: AssetVariation
    }

    type PortfolioStatistics {
        userId: String
        valuation: [AmountOfMoney]
        currentROI: Float
        annualizedROI: Float
        estimatedRisk: Float
        dividends: Float
        expenses: Float
        assetAllocationByType: [AssetAllocation]
        assetAllocationBySector: [AssetAllocation]
        performance: [HistoryPoint]
        benchmarks: [Benchmark]
    }

    type AmountOfMoney {
        currency: String
        amount: Float
    }

    type Benchmark {
        name: String
        market: String
        data: [HistoryPoint]
    }

    type HistoryPoint {
        timestamp: Int
        value: AbsoluteAndPercentage
    }

    type AbsoluteAndPercentage {
        absolute: Float
        percentage: Float
    }

    type AssetAllocation {
        category: String
        percentage: Float
    }

    type AssetExchangeResult {
        assetId: String
        currency: String,
        advertisedPrice: Float
        exchangedPrice: Float
        quantity: Int
        currentAssetBelongings: AssetBelongings
    }
    
    type AssetBelongings {
        userId: String
        assetId: String
        quantity: Int
    }
    
    type CurrencyQuote {
        from: Currency
        to: Currency
        buyPrice: Float
        sellPrice: Float
        market: CurrencyMarket
    }
    
    type CurrencyExchangeResult {
        id: Int,
        userId: String,
        market: CurrencyMarket,
        from: Currency
        to: Currency,
        operation: TradeOperation
        amount: Float
        price: Float
    }
    
    enum CurrencyMarket {
        Official,
        Blue,
        Soy,
        Liqui,
        Bag,
        Ours
    }
    
    enum Currency {
        USD,
        ARS
    }
    
    enum TradeOperation {
        Sell,
        Buy,
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        assets(search: String!, type: IAssetType): [IAsset]
        quote(type: IAssetType!, symbol: String!): IAssetQuote
        quoteHistory(type: IAssetType, symbol: String, range: QuoteRange): IAssetQuoteHistory
        portfolioStatistics: PortfolioStatistics
        getCurrencyPrices(market: CurrencyMarket): [CurrencyQuote]
    }

    type Mutation {
        buyAsset(assetId: String, advertisedPrice: Float, quantity: Int): AssetExchangeResult
        sellAsset(assetId: String, advertisedPrice: Float, quantity: Int): AssetExchangeResult
        exchangeCurrency(operation: TradeOperation!, market: CurrencyMarket!, from: Currency!, to: Currency!, amount: Float!): CurrencyExchangeResult
    }
`

export default typeDefs
