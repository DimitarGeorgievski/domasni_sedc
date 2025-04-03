import ProductService from "../services/product.service.js";

export default class ProductController {
  constructor() {
    this.ProductService = new ProductService();
  }
  async getAll(req, res) {
    try {
      const filters = {};
      if (req.query.name) {
        filters.name = req.query.name;
      }
      if (req.query.category) {
        filters.category = req.query.category;
      }
      const product = await this.ProductService.getAll(filters);
      res.send(product);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async getById(req, res) {
    try {
      const product = await this.ProductService.getById(req.params.id);
      res.send(product);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { name, description, price, quantity, review, rating, category } =
        req.body;
      const productData = { updatedAt: new Date().toISOString() };
      for (let [key, value] of Object.entries({
        name,
        description,
        price,
        quantity,
        review,
        rating,
        category,
      })) {
        if (value) {
          productData[key] = value;
        }
      }
      const product = await this.ProductService.update(
        req.params.id,
        productData
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product successfully updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async create(req, res) {
    try {
        const productBody = req.body;
        const product = await this.ProductService.create(productBody);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
  }
  async deleteById(req,res){
    try {
        const product = await this.ProductService.deleteProduct(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product successfully deleted" });
    } catch (error) {
        res.status(500).send({message: error.message})
    }
  }
}
