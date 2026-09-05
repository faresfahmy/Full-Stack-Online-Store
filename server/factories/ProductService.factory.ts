import { ProductService } from "../services/products.service.ts";

export class ProductServiceFactory{
    public static create():ProductService{
        return new ProductService();
    }
}