import express from "express";
import { Category } from "../entities/Category";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      relations: { products: true },
    });
  
    return res.json(categories);
  } catch {
    return res.status(404);
  }
});

export { router as CategoriesRouter };