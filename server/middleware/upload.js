import multer from "multer";

// Memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer setup for handling multiple image uploads
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 *2 }, // 10MB file limit
});

export default upload;
