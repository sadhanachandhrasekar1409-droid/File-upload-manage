import React from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

function App() {
  return (
    <div className="container">
      <h1>📂 File Upload Manager</h1>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;
