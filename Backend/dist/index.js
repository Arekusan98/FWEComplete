"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const CreateDatabaseConnection_1 = require("./Util/CreateDatabaseConnection");
const global_router_1 = require("./Router/global.router");
const bodyParser = __importStar(require("body-parser"));
var cors = require('cors');
require('dotenv-safe').config();
exports.startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(bodyParser.json());
    app.use(cors());
    const port = Number(process.env.PORT);
    const dbConnection = yield CreateDatabaseConnection_1.createDatabaseConnection();
    app.use('/api', global_router_1.globalRouter);
    const server = app.listen(port, () => {
        console.log('Example app listening on port: ', port);
    });
    return { server, dbConnection };
});
// tslint:disable-next-line: no-floating-promises
exports.startServer();
//# sourceMappingURL=index.js.map