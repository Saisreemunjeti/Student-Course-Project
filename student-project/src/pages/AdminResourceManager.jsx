import React, { useEffect, useState } from "react";

const AdminResourceManager = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("interview"); // default
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchResources = async () => {
    const res = await fetch("http://localhost:8080/api/admin/resources/all");
    const data = await res.json();
    setResources(data);
  };

  useEffect(() => { fetchResources(); }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editId){
      await fetch(`http://localhost:8080/api/admin/resources/${editId}?title=${title}`, { method: "PUT" });
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("file", file);

      await fetch("http://localhost:8080/api/admin/resources/add", {
        method: "POST",
        body: formData,
      });
    }
    setTitle(""); setFile(null); setEditId(null); fetchResources();
  };

  const handleEdit = (res) => { setTitle(res.name); setEditId(res.id); setType(res.pdfUrl ? "interview" : "resume"); };
  const handleDelete = async (id) => { await fetch(`http://localhost:8080/api/admin/resources/${id}`, { method: "DELETE" }); fetchResources(); };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editId ? "Edit Resource" : "Add Resource"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        {!editId && (
          <>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="interview">Interview Kit</option>
              <option value="resume">Resume Template</option>
            </select>
            <input type="file" onChange={handleFileChange} required />
          </>
        )}
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <h3>All Resources</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(res=>(
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.pdfUrl ? "Interview Kit" : "Resume Template"}</td>
              <td>
                {res.pdfUrl && <a href={`http://localhost:8080/${res.pdfUrl}`} target="_blank" rel="noreferrer">View PDF</a>}
                {res.resumeTemplate && <a href={`http://localhost:8080/${res.resumeTemplate}`} target="_blank" rel="noreferrer">View PDF</a>}
              </td>
              <td>
                <button onClick={()=>handleEdit(res)}>Edit</button>
                <button onClick={()=>handleDelete(res.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResourceManager;
