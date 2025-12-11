import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Login failed");
        return;
      }

      const data = await response.json();

      // SAVE ADMIN DETAILS
      localStorage.setItem("adminId", data.id);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("loggedInAdmin", "true");

      alert("Admin Login Successful!");
      navigate("/admin"); // redirect to dashboard

    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Admin Login</h2>

        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Admin Email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-warning w-100 mb-3">Login</button>

        <button
          className="btn btn-outline-light w-100"
          type="button"
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
