import React, { useEffect, useState } from "react";

const AdminProfileView = () => {
  const [admin, setAdmin] = useState(null);

  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminId) return;

    const fetchAdmin = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${adminId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Optional for now
          },
        });

        if (!res.ok) {
          console.error("Fetch failed:", res.status);
          return;
        }

        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };

    fetchAdmin();
  }, [adminId, token]);

  if (!admin) return <h2 style={{ padding: "20px" }}>Loading profile...</h2>;

  const profilePicUrl = admin.profilePic
    ? `http://localhost:8080/${admin.profilePic}`
    : "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div className="profile-card" style={{ padding: "20px" }}>
      <div className="profile-header" style={{ display: "flex", gap: "20px" }}>
        <img
          src={profilePicUrl}
          alt="admin"
          style={{ width: "120px", height: "120px", borderRadius: "50%" }}
        />
        <div className="profile-info">
          <h2>{admin.firstName} {admin.lastName}</h2>
          <p><strong>Email:</strong> {admin.email || "Not Provided"}</p>
          <p><strong>Phone:</strong> {admin.phone || "Not Provided"}</p>
          <p><strong>Role:</strong> {admin.role || "ADMIN"}</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>About</h3>
        <p>{admin.bio || "No bio added."}</p>
      </div>
    </div>
  );
};

export default AdminProfileView;
