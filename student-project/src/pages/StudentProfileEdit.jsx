import React, { useEffect, useState } from "react";

const StudentProfileEdit = ({ onSaved }) => {
  const studentId = localStorage.getItem("userId");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${studentId}`);
        const data = await res.json();
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
        if (data.profilePic) {
          setPreview(`http://localhost:8080/${data.profilePic}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [studentId]);

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
      // Update basic profile
      const updateRes = await fetch(`http://localhost:8080/api/users/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!updateRes.ok) throw new Error("Update failed");

      // Upload profile pic
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const uploadRes = await fetch(
          `http://localhost:8080/api/users/${studentId}/upload-profile`,
          { method: "POST", body: fd }
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
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="form-control mb-2"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="form-control mb-2"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="form-control mb-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-2"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short bio"
          className="form-control mb-2"
        />
        <input type="file" accept="image/*" onChange={handleFile} className="form-control mb-2" />
        {preview && <img src={preview} alt="preview" style={{ width: "100px", borderRadius: "50%" }} />}
        <button type="submit" className="btn btn-warning mt-2" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default StudentProfileEdit;
