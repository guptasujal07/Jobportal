import multer from "multer";

// In-memory storage (good for uploading to Cloudinary or other APIs)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export const singleUpload = upload.single("file"); // "file" is the name of the field in formData
