import express from 'express';
import { Order } from '../entities/Order';
import { OrderLine } from '../entities/OrderLine';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

const router = express.Router();
//get products
router.get("/product", async (req, res) => {
    try {
      const products = await Product.find({
        relations: { category: true },
      });
      return res.json(products);
    } catch {
      return res.status(404);
    }
  });

//get products by category
router.post("/product/:category_id", async (req, res) => {
    try {
        const {category_id} = req.params
         const category = await Category.findOneBy({ id: +category_id });
         if (!category) {
           return res.status(404);
         }
         const {name, description,image,price,isPopular} = req.body
         const product = Product.create({
           category,
           name,
           description,
           image,
           price,
           isPopular,
         });
      await product.save();
      return res.json(product);
    } catch {
      return res.status(404);
    }
  });

export { router as ProductsRouter }
