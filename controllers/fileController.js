import fs from "fs";

export const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.status(200).json({
    message: "File uploaded successfully!",
    file: req.file
  });
};

export const getAllFiles = (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading files" });
    res.json(files);
  });
};

export const deleteFile = (req, res) => {
  const filename = req.params.filename;
  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted successfully" });
  });
};
