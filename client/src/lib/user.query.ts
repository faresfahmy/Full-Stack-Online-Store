import { useQuery } from "@tanstack/react-query"
import { fetchLoginUser, fetchLogoutUser, getDetailsCurrentUser } from "../api/api.user"
export const useLoginUser =({
    role,
    password,
    email
}:{role:string, password:string, email:string})=>{
    const {isLoading, data} = useQuery({
        queryFn:async()=> await fetchLoginUser({password,role,email}),
        queryKey:['user']
    })
    return {user:data?.data, isLoading}
}
export const useDetailsUser =()=>{
    const {isLoading, data} = useQuery({
        queryFn:async()=> await getDetailsCurrentUser(),
        queryKey:['currentUser'],
        staleTime:1000*60*30,
    })
    console.log(data)
    return {user:data, isLoading}
}

export const useLogoutUser = ()=>{
    const {isLoading} = useQuery({
        queryFn:async()=> await fetchLogoutUser(),
        queryKey:['logoutUser']
    })

    return isLoading;
}