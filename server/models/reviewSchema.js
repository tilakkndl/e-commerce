import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    review: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// // Auto-update the product's avgRating when a new review is added
// reviewSchema.post("save", async function () {
//   const product = await mongoose.model("Product").findById(this.product);
//   if (product) {
//     const reviews = await mongoose.model("Review").find({ product: product._id });
//     const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
//     product.avgRating = totalRating / reviews.length;
//     await product.save();
//   }
// });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
