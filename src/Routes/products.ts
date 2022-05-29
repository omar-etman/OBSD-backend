import express from 'express';
import { Product } from '../entities/Product';


const router = express.Router();
//get products
router.get("/", async (req, res) => {
    try {
      const products = await Product.find({
        relations: { category: true },
      });
      return res.json(products);
    } catch {
      return res.status(404);
    }
  });

export { router as ProductsRouter }
