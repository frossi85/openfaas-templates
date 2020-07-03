"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsApi_1 = __importDefault(require("./api/AssetsApi"));
const PortfolioApi_1 = __importDefault(require("./api/PortfolioApi"));
exports.default = {
    assetsApi: new AssetsApi_1.default(),
    portfolioApi: new PortfolioApi_1.default(),
};
