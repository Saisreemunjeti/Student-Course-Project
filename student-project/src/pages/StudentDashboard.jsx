import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "./StudentProfileView";
import ProfileEdit from "./StudentProfileEdit";
import Courses from "./Courses";
import EnrolledCourses from "./EnrolledCourses";
import InterviewKits from "./InterviewKits";
import ResumeTemplates from "./ResumeTemplates";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("profile"); // profile | edit | courses | enrolled | kits | resume
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) navigate("/login");
    else setIsAuth(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (!isAuth) return null;

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="brand">MyPortal</div>
        <ul className="nav-list">
          <li className={active === "profile" ? "active" : ""} onClick={() => setActive("profile")}>Profile</li>
          <li className={active === "edit" ? "active" : ""} onClick={() => setActive("edit")}>Edit Profile</li>
          <li className={active === "courses" ? "active" : ""} onClick={() => setActive("courses")}>Available Courses</li>
          <li className={active === "enrolled" ? "active" : ""} onClick={() => setActive("enrolled")}>Enrolled Courses</li>
          <li className={active === "kits" ? "active" : ""} onClick={() => setActive("kits")}>Interview Kits</li>
          <li className={active === "resume" ? "active" : ""} onClick={() => setActive("resume")}>Resume Templates</li>
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {active === "profile" && <ProfileView />}
        {active === "edit" && <ProfileEdit onSaved={() => setActive("profile")} />}
        {active === "courses" && <Courses />}
        {active === "enrolled" && <EnrolledCourses />}
        {active === "kits" && <InterviewKits />}
        {active === "resume" && <ResumeTemplates />}
      </main>
    </div>
  );
};

export default StudentDashboard;
