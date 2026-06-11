import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFiles/Signin.css";


function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));

  };

  const handleSubmit = (e)=>{

    e.preventDefault();
    // =================================
    // TEMPORARY LOGIN SYSTEM
    // DATABASE CONNECTION LATER
    // =================================


    const demoEmail = "chanura@123";
    const demoPassword = "12345";
    if(
      formData.email === demoEmail &&
      formData.password === demoPassword
    ){

      // login success
      navigate("/store");
    }else{
      alert("Wrong email or password");
    }

    // DATABASE CODE WILL GO HERE LATER
    //
    // Example:
    //
    // const response = await fetch("/api/login",{
    //    method:"POST",
    //    body:JSON.stringify(formData)
    // });
    //
    // if(success){
    //    navigate("/store")
    // }

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
        <button
        className="back-website-btn"
        onClick={()=>navigate("/")}
        >
          Back
        </button>
      </div>

      <div className="signin-form-section">
        <div className="form-wrapper">
          <h1 className="form-title">
            Sign In
          </h1>
          <p className="form-subtitle">
            Access your account
          </p>
          <form 
          className="auth-form"
          onSubmit={handleSubmit}
          >
            <div className="input-group">
              <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              />
            </div>
            <div className="input-group password-group">
              <input
              type={
                showPassword 
                ? "text" 
                : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              />
              <button
              type="button"
              className="password-toggle"
              onClick={()=>
                setShowPassword(!showPassword)
              }
              >
                👁
              </button>
            </div>

            <button

            className="submit-btn"

            type="submit"
            >
              Sign In

            </button>

            <div className="switch-link">


              Don’t have an account?


              <button


              type="button"


              onClick={()=>
                navigate("/signup")
              }


              style={{

                background:"none",

                border:"none",

                color:"#06b6d4",

                cursor:"pointer",

                marginLeft:"6px"

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