import type { bodyTypes } from "../types/types.ts"


export const appError = (status:string, data?:any, statusCode?:number, msg?:string)=>{
    if(status=="fail"){
        return Object.assign(new Error(),{status, data, statusCode:statusCode||500} as bodyTypes)
    }
    else if(status=="error"){
                return Object.assign(new Error(),{status, data:null, statusCode:statusCode||500, message:msg} as bodyTypes)
    }
    else{
        return Object.assign(new Error(msg||''),  {status,data:data||null,statusCode:statusCode||500} as bodyTypes)
    }
}