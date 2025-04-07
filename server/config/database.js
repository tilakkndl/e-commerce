import mongoose from "mongoose";

const connectDatabase = () => {
 
  if (mongoose.connection.readyState === 1) {
    console.log("Database already connected");
    return;
  }

  const DBUrl = process.env.DB_URL.replace(
    "<password>",
    process.env.DB_PASSWORD
  );

  mongoose
    .connect(DBUrl, {
      maxPoolSize: 10, 
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,
    })
    .then((data) => {
      console.log(`Database connected at server ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

export default connectDatabase;


