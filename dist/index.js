"use strict";
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
const dataSource_1 = require("./dataSource");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const categories_1 = require("./routes/categories");
const products_1 = require("./routes/products");
const orders_1 = require("./routes/orders");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dataSource_1.AppDataSource.initialize();
        console.log("connected to DB");
        app.use(express_1.default.json());
        app.use(categories_1.CategoriesRouter, products_1.ProductsRouter, orders_1.OrdersRouter);
        app.listen(8080, () => {
            console.log("App running on port 8080");
        });
    }
    catch (error) {
        console.log(error);
    }
});
main();
//# sourceMappingURL=index.js.map