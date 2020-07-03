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
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("./function/handler"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
if (process.env.RAW_BODY === 'true') {
    app.use(body_parser_1.default.raw({ type: '*/*' }));
}
else {
    var jsonLimit = process.env.MAX_JSON_SIZE || '100kb';
    app.use(body_parser_1.default.json({ limit: jsonLimit }));
    app.use(body_parser_1.default.raw());
    app.use(body_parser_1.default.text({ type: "text/*" }));
}
app.disable('x-powered-by');
class FunctionEvent {
    constructor(req) {
        this.body = req.body;
        this.headers = req.headers;
        this.method = req.method;
        this.query = req.query;
        this.path = req.path;
    }
}
class FunctionContext {
    constructor(cb) {
        this.value = 200;
        this.cb = cb;
        this.headerValues = {};
        this.cbCalled = 0;
    }
    status(value) {
        if (!value) {
            return this.value;
        }
        this.value = value;
        return this;
    }
    headers(value) {
        if (!value) {
            return this.headerValues;
        }
        this.headerValues = value;
        return this;
    }
    succeed(value) {
        this.cbCalled++;
        this.cb(null, value);
    }
    fail(value) {
        let message;
        this.cbCalled++;
        this.cb(value, message);
    }
}
var middleware = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let cb = (err, functionResult) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.toString ? err.toString() : err);
        }
        return res.set(fnContext.headers()).status(fnContext.status()).json(functionResult);
    };
    let fnEvent = new FunctionEvent(req);
    let fnContext = new FunctionContext(cb);
    Promise.resolve(handler_1.default(fnEvent, fnContext))
        .then(res => {
        if (!fnContext.cbCalled) {
            fnContext.succeed(res);
        }
    })
        .catch(e => {
        cb(e);
    });
});
app.post('/*', middleware);
app.get('/*', middleware);
app.patch('/*', middleware);
app.put('/*', middleware);
app.delete('/*', middleware);
const port = process.env.http_port || 3000;
app.listen(port, () => {
    console.log(`OpenFaaS Node.js listening on port: ${port}`);
});
let isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};
let isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};
