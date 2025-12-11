import React, { useEffect, useState } from "react";

const EnrolledCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEnrolled();
  }, []);

  const fetchEnrolled = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/enrollments/student/${studentId}`);
      const data = await res.json();
      setEnrolled(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enrolled Courses</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Category</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map(e => (
            <tr key={e.id}>
              <td>{e.course.name}</td>
              <td>{e.course.instructor}</td>
              <td>{e.course.duration}</td>
              <td>{e.course.category}</td>
              <td>{e.enrollmentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledCourses;
