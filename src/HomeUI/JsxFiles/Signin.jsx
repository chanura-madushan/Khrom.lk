import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Database/supabaseClient";
import "../CssFiles/Signin.css";

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError) {
      setError("Wrong email or password");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/store");
  };

  return (
    <div className="signin-container">
      <div className="signin-banner">
        <div>
          <div className="brand-logo">
            Khrom<span>.lk</span>
          </div>
          <h1 className="banner-title">
            Welcome <span>Back</span>
          </h1>
        </div>
        <button className="back-website-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>

      <div className="signin-form-section">
        <div className="form-wrapper">
          <h1 className="form-title">Sign In</h1>
          <p className="form-subtitle">Access your account</p>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#f87171",
              fontSize: "0.88rem",
              marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="switch-link">
              Don't have an account?
              <button
                type="button"
                onClick={() => navigate("/signup")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#06b6d4",
                  cursor: "pointer",
                  marginLeft: "6px",
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;