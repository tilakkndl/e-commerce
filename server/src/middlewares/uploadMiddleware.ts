import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, `uploads/`); // Temporary local storage
  },
  filename: (_req, file, cb) => {
    const originalName = path.parse(file.originalname).name.replace(/\s+/g, "_"); // Remove spaces
    const extension = path.extname(file.originalname); // Get file extension
    cb(null, `${originalName}-${Date.now()}${extension}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;


