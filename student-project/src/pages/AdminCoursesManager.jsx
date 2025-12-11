import React, { useState, useEffect } from "react";

const AdminCoursesManager = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    duration: "",
    instructor: "",
    category: "",
    videoUrl: "", // new field for video URL
  });
  const [editId, setEditId] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); // only PDF file upload

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/courses/all");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Add or update course
      const res = await fetch(
        editId
          ? `http://localhost:8080/api/courses/${editId}`
          : "http://localhost:8080/api/courses/add",
        {
          method: editId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );

      if (!res.ok) throw new Error("Failed to save course");
      const savedCourse = await res.json();
      const courseId = savedCourse.id;

      // Step 2: Upload PDF file only
      if (pdfFile) {
        const formData = new FormData();
        formData.append("pdf", pdfFile);

        await fetch(`http://localhost:8080/api/courses/${courseId}/upload`, {
          method: "POST",
          body: formData,
        });
      }

      // Reset form
      setCourseData({ name: "", description: "", duration: "", instructor: "", category: "", videoUrl: "" });
      setPdfFile(null);
      setEditId(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to save course");
    }
  };

  const handleEdit = (course) => {
    setCourseData({
      name: course.name,
      description: course.description,
      duration: course.duration,
      instructor: course.instructor,
      category: course.category,
      videoUrl: course.videoUrl || "",
    });
    setEditId(course.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/courses/${id}`, { method: "DELETE" });
    fetchCourses();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editId ? "Edit Course" : "Add New Course"}</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <input type="text" name="name" placeholder="Course Name" value={courseData.name} onChange={handleChange} className="form-control col-md-6" required />
        <input type="text" name="instructor" placeholder="Instructor" value={courseData.instructor} onChange={handleChange} className="form-control col-md-6" />
        <input type="text" name="duration" placeholder="Duration" value={courseData.duration} onChange={handleChange} className="form-control col-md-6" />
        <input type="text" name="category" placeholder="Category" value={courseData.category} onChange={handleChange} className="form-control col-md-6" />
        <textarea name="description" placeholder="Description" value={courseData.description} onChange={handleChange} className="form-control col-12" rows="2"></textarea>

        <div className="col-md-6">
          <label className="form-label">Upload PDF</label>
          <input type="file" name="pdf" onChange={handlePdfChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Video URL (YouTube, Vimeo, etc.)</label>
          <input type="text" name="videoUrl" value={courseData.videoUrl} onChange={handleChange} className="form-control" placeholder="https://..." />
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">{editId ? "Update Course" : "Add Course"}</button>
        </div>
      </form>

      <h3>All Courses</h3>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-6" key={course.id}>
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Category:</strong> {course.category}</p>

                <div className="mb-2">
                  {course.pdfUrl && <a href={`http://localhost:8080/${course.pdfUrl}`} target="_blank" rel="noreferrer">PDF</a>}{" "}
                  {course.videoUrl && <a href={course.videoUrl} target="_blank" rel="noreferrer">Video</a>}
                </div>

                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(course)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoursesManager;
