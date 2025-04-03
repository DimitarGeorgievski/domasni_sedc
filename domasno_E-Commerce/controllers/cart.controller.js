import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";

export default class CartController {
  constructor() {
    this.CartService = new CartService();
    this.ProductService = new ProductService();
  }
  async getAll(req, res) {
    try {
      const cartProducts = await this.CartService.getAll();
      res.status(200).send(cartProducts);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async getById(req, res) {
    try {
      const cartProduct = await this.CartService.getById(req.params.id);
      res.status(200).send(cartProduct);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  async addToCart(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await this.CartService.getById(cartId);
      const { products } = req.body;
      if (!cartId) {
        return res.status(404).send({ message: "Invalid cart Id" });
      }
      const updatedData = [...cart.products];
      for (let productId of products) {
        const cartProduct = await this.ProductService.getById(productId);
        if (cartProduct) {
          updatedData.push(productId);
        }
      }
      const addedData = await this.CartService.addToCart(cartId, {
        products: updatedData,
      });
      res.status(201).send(addedData);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
}