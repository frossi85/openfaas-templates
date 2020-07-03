"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvertiFacilDataSource_1 = __importDefault(require("./InvertiFacilDataSource"));
class PortfolioApi extends InvertiFacilDataSource_1.default {
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('get-portfolio-statistics');
        });
    }
    buyAsset(assetId, price, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('buy-asset', { assetId, price, quantity });
        });
    }
    sellAsset(assetId, price, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('sell-asset', { assetId, price, quantity });
        });
    }
}
exports.default = PortfolioApi;
