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

//cors 
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://e-commerce-frontend-theta-ashy.vercel.app",
        "https://e-commerce-frontend-tilak-kandels-projects.vercel.app",
        "https://e-commerce-frontend-git-main-tilak-kandels-projects.vercel.app",
      ];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
          origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// handling preflight requests
app.options("*", cors());

//built in middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(urlencoded({extended: true}))


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
