
import express, { type Express} from 'express';



const port = process.env.PORT || 4000
export const app: Express = express()



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})