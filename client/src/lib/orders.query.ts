import { useQuery } from "@tanstack/react-query"
import { fetchAllOrders } from "../api/api.order"





export const useGetAllOrders = (page?:number, search?:string,  limit?:number)=>{
    const {data, isLoading} = useQuery({
        queryFn: async()=> await fetchAllOrders({page,search,limit}),
        queryKey:["orders",page,search,limit]
    })
    return {
        data,
        isLoading
    }
} 