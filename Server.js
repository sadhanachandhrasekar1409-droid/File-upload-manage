import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static("uploads"));

// Ensure uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", file: req.file });
});

// Get files
app.get("/files", (req, res) => {
  const files = fs.readdirSync("uploads").map((name) => ({
    name,
    url: `http://localhost:${PORT}/${name}`,
  }));
  res.json(files);
});

// Delete file
app.delete("/files/:name", (req, res) => {
  const filePath = `uploads/${req.params.name}`;
  if (!fs.existsSync(filePath))
    return res.status(404).json({ message: "File not found" });
  fs.unlinkSync(filePath);
  res.json({ message: "File deleted successfully" });
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
