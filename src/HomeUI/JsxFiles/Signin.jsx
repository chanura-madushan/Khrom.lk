
import "../CssFiles/Signin.css";
import { useState } from "react";

function Signin({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: true,
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
  };

  return (
    <div className="signin-container">
      <div className="signin-banner">
        <div>
          <div className="brand-logo">
            Khrom<span>.lk</span>
          </div>

          <h1 className="banner-title">
            Build<span>Sell</span> Scale
          </h1>
        </div>

        <button className="back-website-btn" onClick={() => setPage("home")}>
          Back
        </button>
      </div>

      <div className="signin-form-section">
        <div className="form-wrapper">
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">Start building today</p>

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
              I agree to Terms
            </label>

            <button className="submit-btn" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;