import express, { urlencoded } from "express"
import morgan from "morgan"
import cors from "cors";

import userRoute from './routes/userRoute.js'
import errorMiddleware from "./middleware/errorMiddleware.js"
import categoryRoute from './routes/categoryRoute.js'
import brandRoute from './routes/brandRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from "./routes/orderRoute.js"
import ReviewRoute from './routes/reviewRoute.js';
import subscriberRoute from './routes/subscriberRoute.js';


const app = express();

//built in middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(urlencoded({extended: true}))
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-frontend-theta-ashy.vercel.app",
      "https://e-commerce-frontend-tilak-kandels-projects.vercel.app"
    ],
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/brand", brandRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/orders", orderRoute)
app.use("/api/v1/reviews", ReviewRoute)
app.use("/api/v1/subscriber", subscriberRoute)



//custom middleware
app.use(errorMiddleware);

export default app;
