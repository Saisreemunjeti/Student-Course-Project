import React, { useEffect, useState } from "react";

const StudentProfileView = () => {
  const [student, setStudent] = useState(null);
  const studentId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${studentId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Fetch failed:", res.status);
          return;
        }

        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();
  }, [studentId, token]);

  if (!student) return <h2 style={{ padding: "20px" }}>Loading profile...</h2>;

  const profilePicUrl = student.profilePic
    ? `http://localhost:8080/${student.profilePic}`
    : "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div className="profile-card" style={{ padding: "20px" }}>
      <div className="profile-header" style={{ display: "flex", gap: "20px" }}>
        <img
          src={profilePicUrl}
          alt="student"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <div className="profile-info">
          <h2>{student.firstName} {student.lastName}</h2>
          <p><strong>Email:</strong> {student.email || "Not Provided"}</p>
          <p><strong>Phone:</strong> {student.phone || "Not Provided"}</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>About</h3>
        <p>{student.bio || "No bio added."}</p>
      </div>
    </div>
  );
};

export default StudentProfileView;
