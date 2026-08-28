import { useQuery } from "@tanstack/react-query"
import { fetchAllProducts } from "../api/api.product"



export const useGetAllProduct = (page?:number, search?:string, category?:string,  limit?:number)=>{
    const {data, isLoading} = useQuery({
        queryFn:async()=> await fetchAllProducts({page,search,category,limit}),
        queryKey:["products",page, search, category, limit],
    })
    return {
        data,
        isLoading
    }
}