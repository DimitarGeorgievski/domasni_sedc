import Cart from "../schemas/cart.schema.js";

export default class CartService {
    async getAll(){
        return await Cart.find({});
    }
    async getById(id){
        const cartProduct = await Cart.findById(id);
        return cartProduct
    }
    async addToCart(id,body){
        const cartProduct = await Cart.findById(id);
        const ProductData = {...cartProduct, ...body};
        cartProduct.set(ProductData);
        await cartProduct.save();
        return cartProduct;
    }
}
