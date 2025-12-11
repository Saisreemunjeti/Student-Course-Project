import React, { useState } from "react";
import AdminCoursesManager from "./AdminCoursesManager";
import AdminResources from "./AdminResources";
import AdminProfileView from "./AdminProfileView";
import AdminProfileEdit from "./AdminProfileEdit";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState("courses");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button onClick={() => setTab("courses")} className={tab === "courses" ? "active" : ""}>Courses</button>
        <button onClick={() => setTab("resume")} className={tab === "resume" ? "active" : ""}>Resume Templates</button>
        <button onClick={() => setTab("interview")} className={tab === "interview" ? "active" : ""}>Interview Kits</button>

        <button onClick={() => setTab("profile-view")} className={tab === "profile-view" ? "active" : ""}>Profile</button>
        <button onClick={() => setTab("profile-edit")} className={tab === "profile-edit" ? "active" : ""}>Edit Profile</button>

        <a href="/admin-login" className="logout-btn">Logout</a>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {tab === "courses" && <AdminCoursesManager />}
        {tab === "resume" && <AdminResources type="resume" />}
        {tab === "interview" && <AdminResources type="interview" />}
        {tab === "profile-view" && <AdminProfileView />}
        {tab === "profile-edit" && <AdminProfileEdit />}
      </div>
    </div>
  );
};

export default AdminDashboard;
