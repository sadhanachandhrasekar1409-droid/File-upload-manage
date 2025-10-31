import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose a file");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/files/upload", formData);
    alert("File uploaded successfully!");
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
