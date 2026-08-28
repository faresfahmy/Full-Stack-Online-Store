import axios from "axios";
import { ResponseProducts } from "../../types/types";





export const fetchAllProducts = async ({page,search,category, limit}:{page?:number,search?:string, category?:string,limit?:number}):Promise<ResponseProducts> => {
    console.log(page)
    const allProduct = await axios.get(`http://localhost:4000/api/products`,
          {
        withCredentials: true,
        params:{
            page:page||1,
            limit:limit||5,
            category
        }
    }
    )
    return allProduct.data;
}