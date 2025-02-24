import Brand from "../models/brandSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createBrand = catchAsync(async (req, res, next) => {
  const { brand } = req.body;

  if (!brand) {
    return next(new AppError("Brand name is required", 400));
  }

  const newBrand = await Brand.create({ brand });

  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    data: newBrand,
  });
});

export const getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    success: true,
    message: "Brands retrieved successfully",
    data: brands,
  });
});

export const getBrandById = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Brand retrieved successfully",
    data: brand,
  });
});

export const updateBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    data: brand,
  });
});

export const deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
    data: null,
  });
});
