import Product from "../models/productSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Category from '../models/categorySchema.js'
import Brand from '../models/brandSchema.js'
import cloudinary from '../config/cloudinary.js'
import Review from "../models/reviewSchema.js";

const cloudinaryUpload = async (files, name) => {
    try {
        const galleryUrls = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: `uploads/products/${name}`,
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve({ url: result.secure_url, public_id: result.public_id });
                            }
                        }
                    );

                    // Ensure the file buffer is actually sent to the stream
                    stream.end(file.buffer);
                });
            })
        );

        return galleryUrls;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new AppError("Failed to upload images to Cloudinary", 500);
    }
};

const getPublicIdsFromProduct = (product) => {
  if (!product || !product.variants) return [];

  return product.variants.flatMap(variant => 
      variant.gallery ? variant.gallery.map(image => image.public_id) : []
  );
};

const cloudinaryDelete = async (publicIds) => {
  try {
      if (!publicIds || publicIds.length === 0) {
          throw new AppError("No public IDs provided for deletion", 400);
      }

      const deleteResults = await Promise.all(
          publicIds.map((publicId) => {
              return new Promise((resolve, reject) => {
                  cloudinary.uploader.destroy(publicId, (error, result) => {
                      if (error) {
                          reject({ publicId, status: "error", error: error.message });
                      } else {
                          resolve({ publicId, status: result.result || "failed" });
                      }
                  });
              });
          })
      );

      return deleteResults;
  } catch (error) {
      throw new AppError("Failed to delete images from Cloudinary", 500);
  }
};



export const createProduct = catchAsync(async (req, res, next) => {
    const {
        name,
        brand,
        category,
        price,
        style,
        age,
        sex,
        discount=0,
        description,
        variants
    } = req.body;

    const files = req.files;

    // Ensure brand exists
    const brandExists = await Brand.findOne({brand});
    if (!brandExists) {
        return next(new AppError("Brand does not exist", 404));
    }

    // Ensure category exists
    const categoryExists = await Category.findOne({category});
    if (!categoryExists) {
        return next(new AppError("Category does not exist", 404));
    }

        //check if files are uploaded
        if (files.length === 0) {
            return next(new AppError("No files uploaded", 400));
        }
    
        const gallery = await cloudinaryUpload(files, name);
    
    
            // Parse variants JSON string into an array
            let formattedVariants = JSON.parse(variants);

            // formattedVariants = {...formattedVariants, gallery};
            formattedVariants = formattedVariants.map((variant) => {
                return { ...variant, gallery };
            });
            // console.log(files);
            console.log(formattedVariants);
            // console.log(gallery);
            // console.log(price, discount);
   

    // Create product with structured data
    const product = await Product.create({
        name,
        brand: brandExists._id,
        category: categoryExists._id,
        price,
        style,
        age,
        sex,
        discount,
        description,
        variants: formattedVariants,
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
    });
});


export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("brand category reviews");
  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("brand category reviews.user");
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product retrieved successfully",
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
 const {
    name,
    brand,
    category,
    price,
    style,
    age,
    sex,
    discount,
    description,
    status,
} = req.body;
let updateFields = {};
if (name)  updateFields.name = name;
if (price)  updateFields.price = price;
if (style)  updateFields.style = style;
if (age)  updateFields.age = age;
if (sex) updateFields.sex = sex;
if (discount)  updateFields.discount = discount;
if (description)  updateFields.description = description;
if (status)  updateFields.status = status;

 // Ensure brand exists
 if(brand){
  const brandExists = await Brand.findOne({brand});
  if (!brandExists) {
      return next(new AppError("Brand does not exist", 404));
  }
  updateFields.brand = brandExists._id;
 }


 // Ensure category exists
 if(category){
  const categoryExists = await Category.findOne({category});
  if (!categoryExists) {
      return next(new AppError("Category does not exist", 404));
  }
  updateFields.category = categoryExists._id;
 }


  const product = await Product.findByIdAndUpdate(req.params.id,
    updateFields,
      {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const publicIds = getPublicIdsFromProduct(product);
  // console.log(publicIds);
  const deleteResults = await cloudinaryDelete(publicIds);
  // console.log(deleteResults);

  await Product.findByIdAndDelete(req.params.id);
 
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

// ✅ Add a Review to a Product
export const addReview = catchAsync(async (req, res, next) => {
  const { rating, review } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.reviews.push({ user: req.user.id, rating, review });
  await product.calculateAvgRating();
  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: product,
  });
});

// ✅ Delete a Review
export const deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.reviews = product.reviews.filter((r) => r.user.toString() !== req.user.id);
  await product.calculateAvgRating();
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    data: product,
  });
});


// ========================== VARIANT CRUD OPERATIONS ==========================
export const variantImageUpload = catchAsync(async (req, res, next) => {
  const files = req.files;
  const productId = req.body.productId;

  const product = await Product.findById(productId);
  if (!product) {
      return next(new AppError("Product not found", 404));
  }

  if (!files || files.length === 0) {
      return next(new AppError("No files uploaded", 400));
  }

  // Upload images to Cloudinary
  const gallery = await cloudinaryUpload(files, product.name);

  // Check if at least one variant exists
  if (product.variants.length === 0) {
      return next(new AppError("No existing variants found. Add a variant first before uploading images.", 400));
  }

  // Find the last variant (or modify logic to select a specific one)
  const lastVariant = product.variants[product.variants.length - 1];

  // Append the new images to the existing gallery
  const newVariant = lastVariant.gallery.push(...gallery);

  // Save the updated product
  await product.save({ validateBeforeSave: false }); // Bypass validation

  return res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      data: gallery,
      product: product,
      newVariant: newVariant,
  });
});

// ✅ Add Variant to a Product
export const addVariant = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.variants.push(req.body);
  await product.save();

  res.status(201).json({
    success: true,
    message: "Variant added successfully",
    data: product,
  });
});

// ✅ Update a Variant
export const updateVariant = catchAsync(async (req, res, next) => {
  const { variantId } = req.params;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const variantIndex = product.variants.findIndex((v) => v._id.toString() === variantId);
  if (variantIndex === -1) {
    return next(new AppError("Variant not found", 404));
  }

  product.variants[variantIndex] = { ...product.variants[variantIndex], ...req.body };
  await product.save();

  res.status(200).json({
    success: true,
    message: "Variant updated successfully",
    data: product,
  });
});

// ✅ Delete a Variant
export const deleteVariant = catchAsync(async (req, res, next) => {
  const { variantId } = req.params;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.variants = product.variants.filter((v) => v._id.toString() !== variantId);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Variant deleted successfully",
    data: product,
  });
});
