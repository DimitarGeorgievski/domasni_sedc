import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products:{
        type: [Schema.Types.ObjectId],
        required: [true, "products are required"],
        ref: "product",
    }
})
const Cart = model("cartSchema", cartSchema, "cart")
export default Cart;
