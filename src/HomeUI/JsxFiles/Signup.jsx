import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Database/supabaseClient";
import "../CssFiles/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "buyer",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from("users").insert({
      id: data.user.id,
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
    });

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    // Redirect based on role
    if (formData.role === "seller") {
      navigate("/dashboard");
    } else {
      navigate("/store");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-banner">
        <div>
          <div className="signup-brand">Khrom<span>.lk</span></div>
          <h1 className="signup-title">Start <span>Building</span></h1>
        </div>
        <button className="back-website-btn" onClick={() => navigate("/")}>Back</button>
      </div>

      <div className="signup-form-section">
        <div className="form-wrapper">
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">Join us today</p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "0.88rem", marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            {/* Role selector */}
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${formData.role === "buyer" ? "role-active" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, role: "buyer" }))}
              >
                🛍️ I'm a Buyer
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === "seller" ? "role-active" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, role: "seller" }))}
              >
                🚀 I'm a Seller
              </button>
            </div>

            <div className="form-row">
              <div className="input-group">
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>👁</button>
            </div>

            <label className="checkbox-label">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
              <span className="custom-checkbox"></span>
              I agree to Terms & Conditions
            </label>

            <button className="submit-btn" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="switch-link">
              Already have an account?
              <button type="button" onClick={() => navigate("/signin")} style={{ background: "none", border: "none", color: "#06b6d4", cursor: "pointer", marginLeft: "6px" }}>
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