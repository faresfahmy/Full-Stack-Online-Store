import { Product } from "../models/product.model.ts";
import type { productTypes } from "../types/types.ts";

interface ProductRepositoryTypes{
    getAllProductRepo:(limit:number, page:number, q_query?:Record<string,any>)=> Promise<[products: any, countProducts: number]>,
    getProductById:(id:string)=>any
}

export class ProductRepository implements ProductRepositoryTypes{
    async getAllProductRepo(limit: number, page: number, q_query?: Record<string, any>):Promise<[products: any, countProducts: number]>{
        const [products, countProducts] = await Promise.all([
                    Product.find(q_query).select("-__v").limit(limit).skip((page - 1) * limit),
                    Product.countDocuments(q_query)
                ])
        return [products, countProducts]
    }
    getProductById(id: string):any{
        return  Product.findOne({ "_id": id }).select("-__v");
    }
}

