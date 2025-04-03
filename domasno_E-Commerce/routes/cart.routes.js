import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get("/:id", (req, res) => cartController.getById(req, res));
cartRouter.get("/", (req, res) => cartController.getAll(req, res));
cartRouter.patch("/:id", (req, res) => cartController.addToCart(req, res));

export default cartRouter;