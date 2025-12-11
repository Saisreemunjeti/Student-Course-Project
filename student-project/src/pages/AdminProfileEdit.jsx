import React, { useEffect, useState } from "react";

const AdminProfileEdit = ({ onSaved }) => {
  const adminId = localStorage.getItem("adminId");  // FIXED HERE
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: ""
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${adminId}`);  // FIXED HERE
        const data = await res.json();

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || ""
        });

        if (data.profilePic) {
          setPreview(`http://localhost:8080/${data.profilePic}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [adminId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // UPDATE ADMIN BASIC PROFILE
      const updateRes = await fetch(`http://localhost:8080/api/users/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!updateRes.ok) throw new Error("Update failed");

      // UPLOAD PROFILE PIC
      if (file) {
        const fd = new FormData();
        fd.append("file", file);

        const uploadRes = await fetch(
          `http://localhost:8080/api/users/${adminId}/upload-profile`,
          {
            method: "POST",
            body: fd,
          }
        );

        if (!uploadRes.ok) throw new Error("Upload failed");
      }

      alert("Saved successfully!");

      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Edit Admin Profile</h2>

      <form onSubmit={handleSave}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="First Name"
          required
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Last Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Phone"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Short bio"
        />

        <input
          type="file"
          className="form-control mb-2"
          accept="image/*"
          onChange={handleFile}
        />

        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        <button
          className="btn btn-warning mt-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfileEdit;
