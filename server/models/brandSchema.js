import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
