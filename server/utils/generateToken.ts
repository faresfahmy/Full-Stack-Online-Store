import jwt from 'jsonwebtoken';
export const JWT_EXPIRES_IN = "1d";

export const generateToken = async({userId, role}:{userId:string, role:string})=>{
    return  jwt.sign({
        userId,
        role,
    },
    process.env.JWT_SECRET!!,
    {
        expiresIn:JWT_EXPIRES_IN
    }
) 
}