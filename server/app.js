import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import categoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();

//built in middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend URL
    credentials: true,
  })
);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/orders", orderRoute);

//custom middleware
app.use(errorMiddleware);

export default app;
