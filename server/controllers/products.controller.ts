import type { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.ts";
import type { _Id, Files_Upload, productTypes, queryTypes } from "../types/types.ts";
import { matchedData, validationResult } from "express-validator";
import { appError } from "../utils/appError.ts";
import { FAIL, SUCCESS } from "../utils/httpStatus.ts";
import { ProductService } from "../services/products.service.ts";
import { ProductServiceFactory } from "../factories/ProductService.factory.ts";



export const addProduct = asyncWrapper(
    async(req:Request<{},{},productTypes>, res:Response, next:NextFunction)=>{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return next(appError(FAIL, result.array(),400));
        }
        const files:Files_Upload = req.files;
        const product = await ProductServiceFactory.create().addProductService(matchedData(req), files);
        res.status(201).json({
            status:SUCCESS,
            data:product,
        })
    }
)

export const getAllProduct = asyncWrapper(
    async(req:Request<{},{},{},queryTypes>,res:Response, next:NextFunction )=>{
        const {products, countProducts, countPages} = await ProductServiceFactory.create().getAllProductService(req.query);
        res.status(200).json(
            {
                status:SUCCESS,
                data:{
                    pages:countPages,
                    count:countProducts,
                    products
                }
            }
        )
    }
)

export const searchProduct = asyncWrapper(
    async(req:Request<{},{},{},queryTypes>,res:Response, next:NextFunction )=>{
        const {products, totalProducts, totalPages} = await ProductServiceFactory.create().searchProductService(req.query);
        res.status(200).json(
            {
                status:SUCCESS,
                data:{
                    pages:totalPages,
                    count:totalProducts,
                    products
                }
            }
        )
    }
)

export const getProduct = asyncWrapper(
    async(req:Request<_Id>, res:Response, next:NextFunction)=>{
        const {product} = await ProductServiceFactory.create().getProductService( req.params.id)
        res.status(200).json({
            status:SUCCESS, 
            data:product,
        })
    }
)

export const deleteProduct = asyncWrapper(
    async(req:Request<_Id>, res:Response, next:NextFunction)=>{
        const delProduct = await ProductServiceFactory.create().deleteProductService(req.params.id);
        res.status(204).json({
            status:SUCCESS,
            data:"The product has been deleted."
        })
    }
)
export const updateProduct =asyncWrapper(
    async(req:Request<_Id, {},productTypes>, res:Response, next:NextFunction)=>{
        const {id} = req.params;
        const dataProduct = req.body;
        const {product} = await ProductServiceFactory.create().updateProductService(id, dataProduct);
        res.status(200).json({
            statsu:200,
            data:product,
        })
    }
)