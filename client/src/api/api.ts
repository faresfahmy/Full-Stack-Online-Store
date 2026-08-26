import axios from "axios"
import { FILE_CLOUDINARY, payloadLogin } from "../../types/types";


export const fetchLoginUser = async ({ role, password, email }: payloadLogin) => {
    const login = await axios.post("http://localhost:4000/api/users/login", {
        password: password,
        email: email,
        role: role
    },
        {
            withCredentials: true
        })
    return login;
}
export const fetchSginUpUser = async (dataForm: FormData) => {
    const signup = await axios.post("http://localhost:4000/api/users/register", dataForm, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return signup;
}
export const getDetailsCurrentUser = async () => {
    const detailsUser = await axios.post("http://localhost:4000/api/users/current", {},
        {
            withCredentials: true
        })
    return detailsUser;
}

export const fetchLogoutUser = async () => {
    const detailsUser = await axios.post("http://localhost:4000/api/users/logout", {},
        {
            withCredentials: true
        })
}

export const fetchEditUser = async ({dataForm, id}:{dataForm:FormData, id:string}) => {
    const editUser = await axios.patch(`http://localhost:4000/api/users/${id}`, dataForm, {
        withCredentials: true
    }
    )
    return editUser;
}