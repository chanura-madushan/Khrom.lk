import { useNavigate } from "react-router-dom";
import "../CssFiles/Getstarted.css";

function Getstarted() {
  const navigate = useNavigate();

  return (
    <div className="getstarted-container">
      <h1 className="title">Welcome</h1>
      <p className="subtitle">Choose an option to continue</p>

      <div className="button-group">
        <button className="btn secondary" onClick={() => navigate("/signin")}>
          Sign In
        </button>

        <button className="btn primary" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Getstarted;