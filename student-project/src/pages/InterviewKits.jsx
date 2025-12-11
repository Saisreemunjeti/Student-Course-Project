import React, { useEffect, useState } from "react";

const InterviewKits = () => {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/courses/interview-kits");
        if (!res.ok) throw new Error("Failed to fetch interview kits");
        const data = await res.json();
        setKits(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchKits();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interview Kits</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {kits.length > 0 ? (
            kits.map((kit) => (
              <tr key={kit.id}>
                <td>{kit.name}</td>
                <td>
                  {kit.pdfUrl ? (
                    <a href={`http://localhost:8080/${kit.pdfUrl}`} target="_blank" rel="noreferrer">
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
              <td colSpan="2">No interview kits available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewKits;
