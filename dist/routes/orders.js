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
exports.OrdersRouter = void 0;
const express_1 = __importDefault(require("express"));
const Order_1 = require("../entities/Order");
const OrderLine_1 = require("../entities/OrderLine");
const Product_1 = require("../entities/Product");
const router = express_1.default.Router();
exports.OrdersRouter = router;
//get all orders
router.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find({
            relations: { orderline: { product: true } },
        });
        return res.json(orders);
    }
    catch (_a) {
        return res.status(404);
    }
}));
//create order
router.post("/order/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hi code');
    try {
        const { items, name, address, mobile, city, totalPrice } = req.body;
        console.log({ items, name, address, mobile, city, totalPrice });
        const order = Order_1.Order.create({
            name,
            address,
            mobile,
            city,
            totalPrice
        });
        yield order.save();
        console.log('hi data');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const product = yield Product_1.Product.findOneBy({ id: +item.id });
            console.log('hi error');
            if (!product) {
                return res.status(404).json({ msg: "not included" });
            }
            const orderline = OrderLine_1.OrderLine.create({
                product,
                order,
                quantity: +item.quantity
            });
            yield orderline.save();
        }
        // manipulate the returned data
        const createdOrder = yield Order_1.Order.find({
            where: { id: +order.id },
            relations: { orderline: true },
        });
        return res.json(createdOrder);
    }
    catch (_b) {
        return res.status(404);
    }
}));
//get order by id
router.get("/order/:order_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const order = yield Order_1.Order.find({
            where: { id: +order_id },
            relations: { orderline: { product: true } },
        });
        if (order.length === 0) {
            return res.status(404).json({ msg: "order doesn't exist" });
        }
        return res.json(order);
    }
    catch (_c) {
        return res.status(404);
    }
}));
//get completed
router.get("/orders/completed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find({
            where: { completed: true },
            relations: { orderline: true },
        });
        if (orders.length === 0) {
            return res.status(404).json({ msg: "no completed orders" });
        }
        return res.json(orders);
    }
    catch (_d) {
        return res.status(404);
    }
}));
//update order status
router.get("/order/:order_id/completed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const order = yield Order_1.Order.findOneBy({ id: +order_id });
        if (!order) {
            return res.status(404).json({ msg: "order doesn't exist" });
        }
        order.completed = !order.completed;
        yield order.save();
        const updatedOrders = yield Order_1.Order.find({
            where: { id: +order_id },
            relations: { orderline: { product: true } },
        });
        return res.json(updatedOrders);
    }
    catch (_e) {
        return res.status(404);
    }
}));
//# sourceMappingURL=orders.js.map