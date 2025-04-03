import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products:{
        type: [Schema.Types.ObjectId],
        ref: "product",
        required: [true, "products are required"],
    }
})
const Cart = model("cartSchema", cartSchema, "cart")
export default Cart;
