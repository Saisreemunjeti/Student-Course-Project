import React, { useState } from "react";

const AdminResources = ({ type }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type); // optional, for backend categorization

    try {
      const res = await fetch("http://localhost:8080/api/auth/upload-resource", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadMessage(`Upload successful: ${data.url}`);
      setFile(null);
      e.target.reset(); // reset form
    } catch (err) {
      console.error(err);
      setUploadMessage("Upload failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload {type}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>

      {uploadMessage && <p style={{ marginTop: "10px" }}>{uploadMessage}</p>}
    </div>
  );
};

export default AdminResources;
