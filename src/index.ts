import { AppDataSource } from "./dataSource";
import dotenv from 'dotenv';
import express, { application } from "express";
import { CategoriesRouter } from "./routes/categories";
import { ProductsRouter } from "./routes/products";
import { OrdersRouter } from "./routes/orders";

dotenv.config()

var cors = require("cors");

const app = express();
app.use(cors());

const main = async () => {
  try {
      await AppDataSource.initialize();
      console.log("connected to DB")
      app.use(express.json());
      app.use(CategoriesRouter, ProductsRouter, OrdersRouter);


      app.listen(8080,()=>{
          console.log("App running on port 8080")
      })
  } catch (error) {
    console.log(error);
  }
};

main();