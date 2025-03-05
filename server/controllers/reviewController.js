import Review from "../models/reviewSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const checkDetailsAvailability = catchAsync(async (user, product, userID) => {
  if(user !== userID){
    throw new AppError("You are not allowed to review this product", 403);
  }
  const currentUser = await User.findById(userID);
  if(!currentUser){
    throw new AppError("User not found", 404);
  }
  const currentProduct = await Product.findById(product)
  if(!currentProduct){
    throw new AppError("Product not found", 404);
  }
  return true;
})

const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const totalRating = parseFloat(reviews.reduce((acc, review) => acc + review.rating, 0).toFixed(1));
  const avgRating = reviews.length ? totalRating / reviews.length : 0;
  return await Product.findByIdAndUpdate(productId, { avgRating });
};

export const createReview = catchAsync(async (req, res) => {
  const { user, product, rating, review } = req.body;
await checkDetailsAvailability(user, product, req.user._id.toString());
 
  const newReview = await Review.create({ user, product, rating, review });
  await updateProductRating(product);
  res.status(201).json({ success: true, message: "Review Created successfully", data: newReview });
});

// Update a review
export const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {user, product} = req.body;
  await checkDetailsAvailability(user, product, req.user._id.toString());
  let updateReview = {}
  if(req.body.rating) updateReview.rating = req.body.rating;
  if(req.body.review) updateReview.review = req.body.review;

  const updatedReview = await Review.findByIdAndUpdate(id, { ...updateReview}, { new: true });
  if (!updatedReview) return next(new AppError("Review not found", 404));
if(req.body.rating){

  await updateProductRating(updatedReview.product);
}
  res.json({ success: true, message: "Review Updated Successfully", data: updatedReview });
});

// Delete a review
export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  await Review.findByIdAndDelete(id);
  await updateProductRating(review.product);

  res.json({ success: true, message: "Review deleted successfully" });
});

// Get a single review
export const getReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id).populate("user", "name").populate("product", "name");
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  res.json({ success: true, review });
});

// Get all reviews for a product
export const getReviewsByProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId }).populate("user", "name");
  res.json({ success: true, reviews });
});
