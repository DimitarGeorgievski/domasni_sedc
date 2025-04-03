import Product from "../schemas/products.schema.js";
import { ObjectId } from "mongodb";

export default class ProductService {
  async getAll(filters = {}) {
    const products = await Product.find(filters).collation({
      locale: "en",
      strength: 2,
    });
    return products;
  }
  async getById(id) {
    const product = await Product.findById({ _id: new ObjectId(id) });
    return product
  }
  async update(id,body){
    const product = await this.getById(id);
    const updatedData = {...product, ...body};
    product.set(updatedData);
    await product.save();
    return product;
  }
  async create(body){
    return await Product.create(body);
  }
  async deleteProduct(id){
    return await Product.findByIdAndDelete({_id: new ObjectId(id)});
  }
}
