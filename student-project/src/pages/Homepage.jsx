import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* HERO SECTION */}
      <header className="hero-section text-center text-light">
        <h1 className="hero-title">Welcome to EduMaster Academy</h1>
        <p className="hero-subtitle">
          Learn. Empower. Grow. Your future begins here.
        </p>
      </header>

      {/* OPTIONS SECTION */}
      <div className="container options-section">
        <div className="row justify-content-center">

          {/* STUDENT REGISTER */}
          <div className="col-md-4">
            <div className="option-card">
              <h3>Join as Student</h3>
              <p>Register and start enrolling in top courses.</p>
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/register")}
              >
                Register as Student
              </button>
              <button
                className="btn btn-outline-light w-100 mt-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>

          {/* ADMIN LOGIN */}
          <div className="col-md-4">
            <div className="option-card">
              <h3>Admin Portal</h3>
              <p>Manage courses, students, enrollments & more.</p>
              <button
                className="btn btn-warning w-100"
                onClick={() => navigate("/admin-register")}
              >
                Register as Admin
              </button>
               <button
      className="btn btn-outline-light w-100 mt-2"
      onClick={() => navigate("/admin-login")}
    >
      Login
    </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="text-center text-light mb-4">Why Choose Us?</h2>
        <div className="container">
          <div className="row">

            <div className="col-md-4">
              <div className="feature-card">
                <h4>Expert Instructors</h4>
                <p>Learn from industry professionals with real-world skills.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h4>Top Courses</h4>
                <p>Choose from curated, high-quality trending courses.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h4>100% Practical</h4>
                <p>Hands-on learning to boost your career instantly.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section text-center">
        © 2025 EduMaster Academy — All Rights Reserved
      </footer>
    </div>
  );
};

export default Homepage;
