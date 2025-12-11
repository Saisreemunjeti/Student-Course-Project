import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/courses/all");
        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Course fetch error:", err);
        alert("Error fetching courses: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Enroll function
  const handleEnroll = async (courseId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in first.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: { id: parseInt(userId) },
          course: { id: parseInt(courseId) },
        }),
      });

      // Because backend returns PLAIN TEXT on error
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text); // For success responses
      } catch {
        data = text; // For plain text errors
      }

      if (!res.ok) {
        alert("Failed to enroll: " + data);
        return;
      }

      alert("Successfully enrolled!");
    } catch (err) {
      console.error("Enroll error:", err);
      alert("Error enrolling: " + err.message);
    }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3> {/* FIXED field name */}
              <p>{course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>

              <button className="enroll-btn" onClick={() => handleEnroll(course.id)}>
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
