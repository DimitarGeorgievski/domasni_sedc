import { Router } from "express";
import ProductController from "../controllers/products.controller.js";


const productRouter = Router();
const productController = new ProductController;

productRouter.get("/", (req,res) => productController.getAll(req,res));
productRouter.get("/:id", (req,res) => productController.getById(req,res));
productRouter.put("/:id", (req,res) => productController.update(req,res));
productRouter.post("/", (req,res) => productController.create(req,res));
productRouter.delete("/:id", (req,res) => productController.deleteById(req,res));

export default productRouter;