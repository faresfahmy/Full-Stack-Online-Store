import axios from "axios";
import type { Response } from "../../types/types";




export const fetchAllOrders = async ({page,search, limit}:{page?:number,search?:string,limit?:number}):Promise<Response> => {
    const dataOrders = await axios.get("http://localhost:4000/api/orders", {
        withCredentials:true,
        params:{
            page:page??1,
            limit:limit??5,
            ...(search&&{q:search})
        }
    })
    return dataOrders.data;
}
