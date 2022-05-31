"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const Category_1 = require("./entities/Category");
const Order_1 = require("./entities/Order");
const OrderLine_1 = require("./entities/OrderLine");
const Product_1 = require("./entities/Product");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Category_1.Category, Order_1.Order, OrderLine_1.OrderLine, Product_1.Product],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=dataSource.js.map