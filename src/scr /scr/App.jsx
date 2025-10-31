import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const API = "http://localhost:5000";

  const fetchFiles = async () => {
    const res = await axios.get(`${API}/files`);
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile(null);
    fetchFiles();
  };

  const handleDelete = async (name) => {
    await axios.delete(`${API}/files/${name}`);
    fetchFiles();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">📁 File Upload Manager</h1>

      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row items-center gap-3 mb-6"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded p-2 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {files.map((f) => (
          <div
            key={f.name}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {f.name}
            </a>
            <button
              onClick={() => handleDelete(f.name)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
