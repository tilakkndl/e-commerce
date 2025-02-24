import Category from "../models/categorySchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const { category } = req.body;

  if (!category) {
    return next(new AppError("Category name is required", 400));
  }

  const newCategory = await Category.create({ category });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    message: "Categories retrieved successfully",
    data: categories,
  });
});

export const getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    data: category,
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});
