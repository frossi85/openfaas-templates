"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    AssetMetadata: {
        __resolveType(obj, context, info) {
            if (obj.other) {
                return 'AnotherMetadata';
            }
            if (obj.ceo) {
                return 'CompanyMetadata';
            }
            return null;
        },
    },
    Query: {
        assets: (parent, { search, type }, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const a = yield dataSources.assetsApi.search(search, type);
            console.log("@@@ assets", typeof a);
            return [...a];
        }),
        quoteHistory: (parent, { symbol, type, range }, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.assetsApi.getQuoteHistory(type, symbol, range); }),
        portfolioStatistics: (parent, args, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.portfolioApi.getStatistics(); })
    },
    Mutation: {
        buyAsset: (_, { assetId, price, quantity }, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.portfolioApi.buyAsset(assetId, price, quantity); }),
        sellAsset: (_, { assetId, price, quantity }, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.portfolioApi.buyAsset(assetId, price, quantity); })
    }
};
exports.default = resolvers;
