import express from 'express';
import { Order } from '../entities/Order';
import { OrderLine } from '../entities/OrderLine';
import { Product } from '../entities/Product';

const router = express.Router();


//get all orders
router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find({
        relations: { orderline: {product:true}  },
      });
      return res.json(orders);
    } catch {
      return res.status(404);
    }
  });


//create order
router.post("/order/create", async (req, res) => {
    try {
      const { items, name, address, mobile, city } = req.body;
      const order = Order.create({
        name,
        address,
        mobile,
        city,
      });
      await order.save();
      for (let i = 0; i < items.length; i++) {

        const item = items[i]
        const product = await Product.findOneBy({id: +item.id});
    
        if (!product) {
          return res.status(404).json({ msg: "not included" });
        }
        const orderline = OrderLine.create({
            product,
            order,
            quantity: +item.orderQty
        })
        await orderline.save();
      }
      const createdOrder = await Order.find({
        where: { id: +order.id },
        relations: { orderline: true },
      });
      return res.json(createdOrder);
    } catch {
      return res.status(404);
    }
  });

//get order by id
router.get("/order/:order_id", async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await Order.find({
        where: { id: +order_id },
        relations: { orderline: { product: true } },
      });
      if (order.length === 0) {
        return res.status(404).json({ msg: "order doesn't exist" });
      }
      return res.json(order);
    } catch {
      return res.status(404);
    }
  });


//get completed
router.get("/orders/completed", async (req, res) => {
    try {
      const orders = await Order.find({
        where: { completed:true },
        relations: { orderline: true },
      });
      if (orders.length === 0) {
        return res.status(404).json({ msg: "no completed orders" });
      }
      return res.json(orders);
    } catch {
      return res.status(404);
    }
  });

  //update order status
router.get("/order/:order_id/completed", async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await Order.findOneBy({ id: +order_id });
      if (!order) {
        return res.status(404).json({ msg: "order doesn't exist" });
      }
      order.completed=true
      await  order.save();
    const updatedOrders = await Order.find({
      where: { id: +order_id },
      relations: { orderline: { product: true } },
    });
      return res.json(updatedOrders);
    } catch {
      return res.status(404);
    }
  });




export { router as OrdersRouter }
