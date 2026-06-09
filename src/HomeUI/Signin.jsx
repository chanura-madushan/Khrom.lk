import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Fletcher",
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
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="signin-container">
      {/* Left Side: Hero Image Banner */}
      <div className="signin-banner">
        <div className="banner-header">
          <div className="brand-logo">AMU</div>
          <button className="back-website-btn">
            Back to website <span className="arrow">→</span>
          </button>
        </div>
        
        <div className="banner-footer">
          <h1 className="banner-title">
            Capturing Moments,<br />Creating Memories
          </h1>
          <div className="carousel-indicators">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
        </div>
      </div>

      {/* Right Side: Sign In Form */}
      <div className="signin-form-section">
        <div className="form-wrapper">
          <h2 className="form-title">Create an account</h2>
          <p className="form-subtitle">
            Already have an account? <a href="#login" className="login-link">Log in</a>
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="input-group border-highlight">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group full-width">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your passwrod" /* Kept exact typo from UI image */
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* SVG Eye Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span className="custom-checkbox"></span>
                I agree to the <a href="#terms" className="terms-link">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Create account
            </button>
          </form>

          <div className="divider">
            <span>Or register with</span>
          </div>

          <div className="social-login-row">
            <button className="social-btn">
              {/* Google SVG Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-btn">
              {/* Apple SVG Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;