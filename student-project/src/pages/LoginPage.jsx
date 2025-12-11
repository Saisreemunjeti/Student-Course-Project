import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", student);

      console.log("Login Response:", res.data);

      // Save details in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userRole", res.data.role);

      alert("Login Successful!");

      navigate("/dashboard");  // now works!
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Student Login</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Student Email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={student.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mb-3">Login</button>

        <button
          type="button"
          className="btn btn-outline-light w-100"
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>

        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
