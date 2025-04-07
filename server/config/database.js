import mongoose from "mongoose";

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const DBUrl = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

  try {
    const db = await mongoose.connect(DBUrl, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log(`✅ Database connected at host: ${db.connection.host}`);
  } catch (err) {
    console.error("❌ Database connection error:", err);
    throw err;
  }
};

export default connectDatabase;
