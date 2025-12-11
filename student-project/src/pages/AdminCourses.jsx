import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    duration: "",
    instructor: "",
    category: ""
  });
  const [editId, setEditId] = useState(null);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, [navigate]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/courses/all");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing course
        await fetch(`http://localhost:8080/api/courses/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
        setEditId(null);
      } else {
        // Add new course
        await fetch("http://localhost:8080/api/courses/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
      }

      setCourseData({ name: "", description: "", duration: "", instructor: "", category: "" });
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to save course. Check console for details.");
    }
  };

  const handleEdit = (course) => {
    setCourseData({
      name: course.name,
      description: course.description,
      duration: course.duration,
      instructor: course.instructor,
      category: course.category
    });
    setEditId(course.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/courses/${id}`, { method: "DELETE" });
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel - Manage Courses</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 3 months)"
          value={courseData.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={courseData.instructor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Programming)"
          value={courseData.category}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update Course" : "Add Course"}</button>
      </form>

      <h3>All Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.name}</strong> - {course.description} | {course.duration} | {course.instructor} | {course.category}{" "}
            <button onClick={() => handleEdit(course)}>Edit</button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;
