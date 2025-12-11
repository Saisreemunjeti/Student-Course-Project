import React, { useEffect, useState } from "react";

const ResumeTemplates = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/courses/resume-templates");
        if (!res.ok) throw new Error("Failed to fetch resume templates");
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resume Templates</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <tr key={resume.id}>
                <td>{resume.name}</td>
                <td>
                  {resume.resumeTemplate ? (
                    <a href={`http://localhost:8080/${resume.resumeTemplate}`} target="_blank" rel="noreferrer">
                      View PDF
                    </a>
                  ) : (
                    "No PDF"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No resume templates available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeTemplates;
