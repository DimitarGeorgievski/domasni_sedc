import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true,"Name is required"],
        duplicate: [true, "you have already this product added"]
    },
    description:{
        type: String,
        maxLength: 200,
        required: [true, "Description is required"]
    },
    price:{
        type: Number,
        min:0,
        required: [true, "Price is required"]
    },
    quantity:{
        type: Number,
        min:0,
        required: [true, "Quantity is required"]
    },
    reviews:{
        type: [String],
        minLength: 0,
        maxLength: 300,
        required: [true, "Review is required"]
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, "Rating is required"]
    },
    category:{
        type: String,
        minLength: 0,
        maxLength: 20,
        required: [true, "Category is required"]
    },
    updatedAt:{
        type: Date
    }
})

const Product = model("product", productSchema, "products");
export default Product;