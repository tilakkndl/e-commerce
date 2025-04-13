import Product from "../models/productSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Category from '../models/categorySchema.js'
import Brand from '../models/brandSchema.js'
import cloudinary from '../config/cloudinary.js'
import APIFeatures from "../utils/apiFeatures.js";
import Review from "../models/reviewSchema.js";
import chroma from "chroma-js";

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

            formattedVariants = formattedVariants.map((variant) => {
                return { ...variant, gallery };
            });
   

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
  let filter = {};
  const variantFilters = {};
  const allowedVariantFields = ["color", "hexColor", "size"];

  if (req.query.color) {
    const inputColor = req.query.color.toLowerCase();
    const inputHex = chroma(inputColor).hex(); 

    const allProducts = await Product.find({}, { "variants.hexColor": 1 });

    const similarHexColors = allProducts
      .flatMap((product) => product.variants.map((variant) => variant.hexColor))
      .filter((hex) => chroma.distance(inputHex, hex) < 30); 

    if (similarHexColors.length > 0) {
      variantFilters["hexColor"] = { $in: similarHexColors };
    }

    delete req.query.color; 
  }

  Object.keys(req.query).forEach((key) => {
    if (allowedVariantFields.includes(key)) {
      if (key === "size") {
        variantFilters[key] = { $in: req.query[key].split(",") };
      } else {
        variantFilters[key] = req.query[key];
      }
      delete req.query[key];
    }
  });

  if (Object.keys(variantFilters).length > 0) {
    filter["variants"] = { $elemMatch: variantFilters };
  }

  const features = new APIFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});


export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("brand category");
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
if (discount || parseFloat(discount)==0)  updateFields.discount = discount;
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
  const deleteResults = await cloudinaryDelete(publicIds);

  await Product.findByIdAndDelete(req.params.id);
 
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});



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

export const addVariant = catchAsync(async (req, res, next) => {
  
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  
  const files = req.files;
  if (files.length === 0) {
    return next(new AppError("No files uploaded", 400));
  }
  const gallery = await cloudinaryUpload(files, product.name);
  let {color, hexColor, stock, size} = req.body;
  size = JSON.parse(size);
  stock = parseInt(stock);

  product.variants.push({
    color,
    hexColor,
    stock,
    size,
    gallery
  });
  await product.save();

  res.status(201).json({
    success: true,
    message: "Variant added successfully",
    data: product,
  });
});

export const updateVariant = catchAsync(async (req, res, next) => {
  const { variantId, id } = req.params;
  let product = await Product.findById(id);
  
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const variantIndex = product.variants.findIndex((v) => v._id.toString() === variantId);
  if (variantIndex === -1) {
    return next(new AppError("Variant not found", 404));
  }

  let gallery = [];
  if (req.files && req.files.length > 0) {
    gallery = await cloudinaryUpload(req.files, product.name);
    product.variants[variantIndex].gallery = [
      ...product.variants[variantIndex].gallery,
      ...gallery
    ];
  }

  // Update variant fields if provided
  if (req.body.color) product.variants[variantIndex].color = req.body.color;
  if (req.body.hexColor) product.variants[variantIndex].hexColor = req.body.hexColor;
  if (req.body.stock) product.variants[variantIndex].stock = parseInt(req.body.stock);
  if (req.body.size) {
    product.variants[variantIndex].size = Array.isArray(req.body.size)
    ? req.body.size
    : JSON.parse(req.body.size);
  }

await product.save();

const updatedVariant = product.variants[variantIndex]

  res.status(200).json({
    success: true,
    message: "Variant updated successfully",
    data: updatedVariant,
  });
});

export const getAllVariants = catchAsync(async(req, res, next)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  if(!product){
    return next(new AppError("Product not found", 404));
  }
  const variants = product.variants;
  res.status(200).json({
    success: true,
    message: "Fetched all variants",
    data: variants
  })
})

export const getVariantById = catchAsync(async (req, res, next) => {
  const { id, variantId } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const variant = product.variants.find((v) => v._id.toString() === variantId);
  if (!variant) {
    return next(new AppError("Variant not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Fetched variant successfully",
    data: variant,
  });
});



export const deleteVariant = catchAsync(async (req, res, next) => {
  const { id, variantId } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const variantIndex = product.variants.findIndex((v) => v._id.toString() === variantId);
  if (variantIndex === -1) {
    return next(new AppError("Variant not found", 404));
  }

  // Remove the variant from the array
  product.variants.splice(variantIndex, 1);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Variant deleted successfully",
  });
});



export const searchProducts = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new AppError("Search query is required", 400));
  }

  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } }, 
      { description: { $regex: query, $options: "i" } }
    ]
  });

  if (products.length === 0) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    success: true,
    results: products.length,
    data: products,
  });
});
