import express from "express";
import multer from "multer";
import { uploadFile, getAllFiles, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getAllFiles);
router.delete("/:filename", deleteFile);

export default router;
