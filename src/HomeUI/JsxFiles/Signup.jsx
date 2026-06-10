import { useState } from "react";
import "../CssFiles/Signup.css";

function Signup({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // =========================
    // DATABASE CONNECTION LATER
    // =========================
    // fetch("/api/signup", {
    //   method: "POST",
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <div className="signup-container">
      <div className="signup-banner">
        <div>
          <div className="signup-brand">
            Khrom<span>.lk</span>
          </div>

          <h1 className="signup-title">
            Start <span>Building</span>
          </h1>
        </div>

        <button className="back-website-btn" onClick={() => setPage("home")}>
          Back
        </button>
      </div>

      <div className="signup-form-section">
        <div className="form-wrapper">
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">Join us today</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span className="custom-checkbox"></span>
              I agree to Terms & Conditions
            </label>

            <button className="submit-btn" type="submit">
              Create Account
            </button>

            <div className="switch-link">
              Already have an account?
              <button
                type="button"
                onClick={() => setPage("signin")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#06b6d4",
                  cursor: "pointer",
                  marginLeft: "6px",
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;