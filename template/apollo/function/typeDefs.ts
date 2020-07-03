import {gql} from 'apollo-server-express'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    enum AssetType {
        Stock
        Future
        Bond
        Securities
        InternationalStock
        Check
        Option
        TreasuryBills
        FixedIncomeSecurities
        Mocked
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

    type Asset {
        friendlyName: String
        description: String
        market: String
        symbol: String
        currency: String
        type: AssetType
        logo: String
        metadata: AssetMetadata
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

    type AssetQuoteHistory {
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

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        assets(search: String!, type: AssetType): [Asset]
        quoteHistory(type: AssetType, symbol: String, range: QuoteRange): AssetQuoteHistory
        portfolioStatistics: PortfolioStatistics
    }

    type Mutation {
        buyAsset(assetId: String, price: Float, quantity: Int): Asset
        sellAsset(assetId: String, price: Float, quantity: Int): Asset
    }
`

export default typeDefs
