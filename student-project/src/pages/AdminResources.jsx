import React, { useState, useEffect } from "react";
import "./AdminResources.css"; // We'll add CSS for styling

const AdminResources = ({ type }) => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const apiUrl = `http://localhost:8080/api/admin/resources/${type}`;

  const fetchResources = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setResources(data));
  };

  useEffect(() => {
    fetchResources();
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) return alert("Please provide title and PDF");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${apiUrl}/${editId}` : apiUrl;
      await fetch(url, { method, body: formData });
      setTitle("");
      setFile(null);
      setEditId(null);
      fetchResources();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const handleEdit = (r) => {
    setTitle(r.name);
    setEditId(r.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchResources();
  };

  return (
    <div className="resources-container">
      <h2>{type === "interview" ? "Interview Kits" : "Resume Templates"}</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <div className="resources-grid">
        {resources.map((r) => (
          <div key={r.id} className="resource-card">
            <h3>{r.name}</h3>
            {r.pdfUrl && (
              <a
                href={`http://localhost:8080/${r.pdfUrl}`}
                target="_blank"
                rel="noreferrer"
                className="view-btn"
              >
                View PDF
              </a>
            )}
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(r)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(r.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResources;
