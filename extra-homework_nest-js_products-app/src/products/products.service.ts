import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CreateProduct, Product, UpdateProduct } from "./interfaces/product.interface";
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService{
    private PRODUCTS_PATH = join(process.cwd(), "src","products", "data", "products.json");
    async getAllProducts(){
        const productsJson = await readFile(this.PRODUCTS_PATH, "utf-8");
        const products = JSON.parse(productsJson) as Product[];
        return products;
    }
    async getProductsById(id: string){
        const products = await this.getAllProducts();
        const foundProduct = products.find(product => product.id === id);
        if(!foundProduct) throw new NotFoundException("Product not found");
        return foundProduct;
    }
    async saveProducts(products: Product[]){
        await writeFile(this.PRODUCTS_PATH, JSON.stringify(products,null,2));
    }
    async deleteProduct(id:string){
        const products = await this.getAllProducts();
        const foundProduct = products.find(product => product.id === id);
        if(!foundProduct) throw new NotFoundException("Product not found");
        const filteredProducts = products.filter(product => product.id !== foundProduct.id)
        await this.saveProducts(filteredProducts);
    }
    async createProduct(body: CreateProduct){
        const products = await this.getAllProducts();
        const duplicateProduct = products.find(product => product.title === body.title);
        if(duplicateProduct) throw new ConflictException("Product already exists");
        const createProduct = {
            id: uuid(),
            ...body,
        }
        products.push(createProduct);
        await this.saveProducts(products);
        return createProduct;
    }
    async updateProduct(id: string, body: UpdateProduct){
        const products = await this.getAllProducts();
        const foundProduct = products.find(product => product.id === id);
        if(!foundProduct) throw new NotFoundException("Product not found");
        const updateProduct = products.map(product => {
            if(product.id === id){
                return {...product, ...body};
            }
            return product;
        });
        await this.saveProducts(updateProduct)
    }
}
