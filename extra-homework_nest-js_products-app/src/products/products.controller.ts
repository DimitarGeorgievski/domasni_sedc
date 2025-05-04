import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProduct, UpdateProduct } from "./interfaces/product.interface";

@Controller("products")
export class ProductsController{
    constructor(private producutsService: ProductsService){}
    
    @Get()
    getAllProducts(){
        return this.producutsService.getAllProducts();
    }
    @Get(":id")
    getProductsById(@Param("id") productId: string){
        return this.producutsService.getProductsById(productId)
    }
    @Delete(":id")
    deleteProduct(@Param("id") productId: string){
        return this.producutsService.deleteProduct(productId);
    }
    @Post()
    createProduct(@Body() body: CreateProduct){
        return this.producutsService.createProduct(body);
    }
    @Patch(":id")
    updateProduct(@Param("id") productId: string, @Body() body: UpdateProduct){
        return this.producutsService.updateProduct(productId,body);
    }
}