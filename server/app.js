import express, { urlencoded } from "express"
import morgan from "morgan"

import userRoute from './routes/userRoute.js'
import errorMiddleware from "./middleware/errorMiddleware.js"
import categoryRoute from './routes/categoryRoute.js'
import brandRoute from './routes/brandRoute.js'
import productRoute from './routes/productRoute.js'


const app = express()

//built in middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(urlencoded({extended: true}))


app.use("/api/v1/user", userRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/brand", brandRoute)
app.use("/api/v1/product", productRoute)



//custom middleware
app.use(errorMiddleware)


export default  app