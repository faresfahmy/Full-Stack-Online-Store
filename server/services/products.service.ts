
import { profile } from "node:console";
import { uploadFile, uploadMultipleFile } from "../lib/uploadFiles.ts";
import { validateQuery } from "../mock/validateQuery.ts";
import { Product } from "../models/product.model.ts";
import type { _Id, FILE_CLOUDINARY, Files_Upload, productTypes, queryTypes } from "../types/types.ts";
import { appError } from "../utils/appError.ts";
import { generatetSku } from "../utils/generatetSku.ts";
import { ERROR, FAIL } from "../utils/httpStatus.ts";
import { LIMIT, PAGE } from "../utils/pagination.ts";



export abstract class BaseProductService<T> {
    abstract addProductService(data: T, files: Files_Upload): Promise<{ createProduct: T }>
    abstract getAllProductService(query: queryTypes): Promise<{ products: T[], countProducts: number, countPages: number }>
    abstract searchProductService(querySearch: queryTypes): Promise<{ products: T[], countProducts: number, totalPages: number }>
    abstract getProductService(id: string): Promise<{ product: T }>
    abstract deleteProductService(id: string): Promise<void>
    abstract updateProductService(id: string, data: T): Promise<{ product: T }>
    abstract decreasingProductQuantity(idProduct:string): Promise<void>
}


export class ProductService extends BaseProductService<productTypes> {
    async addProductService(data: productTypes, files: Files_Upload): Promise<{ createProduct: productTypes }> {
        const {
            product_name,
            description,
            rating, quantity,
            category,
            price,
            likes_product,
            ids_users_purchased,
            couponCode
        } = data;
        let productImage;

        const productCheck = await Product.findOne({ "product_name": product_name });
        if (productCheck) {
            throw appError(FAIL, "The product already exists", 400);
        }
        if (files) {
            productImage = await uploadMultipleFile(files, "img_product");
        }
        else {
            throw appError(FAIL, "Please upload photos of the product", 400)
        }
        const count = await Product.countDocuments()
        const skuProduct = generatetSku(count);

        
        const createProduct = await Product.create({
            product_name,
            description,
            quantity,
            category,
            price,
            sku: skuProduct,
            img_product: productImage,
            ...(couponCode !== undefined && { couponCode }),
            ...(rating !== undefined && { rating }),
            ...(likes_product !== undefined && { likes_product }),
            ...(ids_users_purchased !== undefined && { ids_users_purchased }),
        });
        if (!createProduct) {
            throw appError(ERROR, null, 500, "An error occurred while creating the product.")
        }
        return {
            createProduct
        }
    }



    async getAllProductService(query: queryTypes): Promise<{ products: productTypes[], countProducts: number, countPages: number }> {
        const { category, q } = query as queryTypes;
        const { limit, page } = validateQuery(query.limit ?? LIMIT.toString(), query.page ?? PAGE.toString());
        const q_query: Record<string, any> = {};
        if (category && category != "all") {
            q_query.category = category;
        }
        if (q) {
            q_query.$text = { $q: q as string }
        }

        const [products, countProducts] = await Promise.all([
            Product.find(q_query).select("-__v").limit(limit).skip((page - 1) * limit),
            Product.countDocuments(q_query)
        ])
        if (products.length == 0) {
            throw appError(FAIL, "Not Found Product", 404);
        }
        const countPages = Math.ceil(countProducts / limit);
        return {
            products,
            countProducts,
            countPages
        }
    }


    async searchProductService(querySearch: queryTypes): Promise<{ products: productTypes[]; countProducts: number; totalPages: number; }> {
        const { page, limit } = validateQuery(querySearch.limit ?? "20", querySearch.page ?? "1");
        if (!querySearch.q) {
            throw appError(FAIL, "Please enter the product name, description, price, or category.", 400);
        }
        const query = { $text: { $search: querySearch.q } };

        const [products, countProducts] = await Promise.all([
            Product.find(query).select("-__v").limit(limit).skip((page - 1) * limit),
            Product.countDocuments()
        ]);
        const totalPages = Math.ceil(countProducts / limit);
        return {
            products,
            countProducts,
            totalPages
        }
    }


    async getProductService(id: string): Promise<{ product: productTypes; }> {
        const product = await Product.findOne({ "_id": id }).select("-__v");
        if (!product) {
            throw appError(FAIL, "Not Found Product", 404)
        }
        return {
            product
        }
    }

    async deleteProductService(id: string): Promise<void> {
        const del = await Product.findByIdAndDelete(id);
        if (!del) {
            throw appError(FAIL, "The product you want to delete does not exist.", 404)
        }
    }
    async updateProductService(id: string, data: productTypes): Promise<{ product: productTypes; }> {
        const update = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!update) {
            throw appError(FAIL, "This product does not exist.", 404);
        }
        return { product: update }
    }

    async decreasingProductQuantity(idProduct: string): Promise<void> {
        const product = await Product.findById(idProduct);
        if(!product||!product.quantity){
            throw appError(FAIL, "this is product not found");
        }

        
        if(product.quantity > 0){
            const quantity = product.quantity - 1;
            const decreasingQuantity = await Product.findByIdAndUpdate(idProduct, {"quantity":quantity})
        }
        else{
           const deleteProduct = await  this.deleteProductService(idProduct);
        }

    } 
}

