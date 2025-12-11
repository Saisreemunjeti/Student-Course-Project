import React, { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/uploaded-resources")
      .then(res => res.json())
      .then(data => setResources(data));
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res, i) => (
            <tr key={i}>
              <td>{res.title}</td>
              <td>{res.type}</td>
              <td><a href={`http://localhost:8080/${res.url}`} target="_blank">View PDF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
