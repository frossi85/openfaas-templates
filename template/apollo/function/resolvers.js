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
require("apollo-cache-control");
exports.default = {
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
        assets: (parent, { search, type }, { dataSources }, info) => __awaiter(this, void 0, void 0, function* () {
            info.cacheControl.setCacheHint({ maxAge: 30 * 60 });
            const a = yield dataSources.assetsApi.search(search, type).then(x => JSON.parse(x));
            console.log(a);
            return dataSources.assetsApi.search(search, type).then(x => JSON.parse(x));
        }),
        quoteHistory: (parent, { symbol, type, range }, { dataSources }, info) => {
            info.cacheControl.setCacheHint({ maxAge: 60 });
            return dataSources.assetsApi.getQuoteHistory(type, symbol, range).then(x => JSON.parse(x));
        },
        portfolioStatistics: (parent, args, { dataSources }, info) => {
            info.cacheControl.setCacheHint({ maxAge: 60 });
            return dataSources.portfolioApi.getStatistics().then(x => JSON.parse(x));
        }
    },
    Mutation: {
        buyAsset: (_, { assetId, advertisedPrice, quantity }, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.portfolioApi.buyAsset(assetId, advertisedPrice, quantity).then(x => JSON.parse(x)); }),
        sellAsset: (_, { assetId, advertisedPrice, quantity }, { dataSources }) => __awaiter(this, void 0, void 0, function* () { return dataSources.portfolioApi.sellAsset(assetId, advertisedPrice, quantity).then(x => JSON.parse(x)); })
    }
};
