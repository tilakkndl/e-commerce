import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    style: {
      type: String,
      enum: ["casual", "formal", "gym", "party"],
      required: true,
    },
    age: {
      type: String,
      enum: ["kid", "adult"],
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    // reviews: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Review",
    //   },
    // ],
    variants: {
      type: [
        {
          color: {
            type: String,
            required: true,
          },
          hexColor: {
            type: String,
            required: true,
          },
          size: {
            type: [String], // Ensures size is an array
            required: true,
            validate: {
              validator: function (value) {
                return Array.isArray(value) && value.length > 0;
              },
              message: "Size must contain at least one element.",
            },
            enum: ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"]
          },
          gallery: {
            type: [
              {
                public_id: {
                  type: String,
                  required: true,
                },
                url: {
                  type: String,
                  required: true,
                }
              }
            ], 
            required: true,
            validate: {
              validator: function (value) {
                return Array.isArray(value) && value.length > 0;
              },
              message: "Gallery must contain at least one image.",
            },
          },
          stock: {
            type: Number,
            required: true,
            min: [0, "Stock cannot be negative"],
          },
        },
      ],
      validate: {
        validator: function (value) {
          return value.length > 0; // At least one variant required
        },
        message: "At least one variant is required.",
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
