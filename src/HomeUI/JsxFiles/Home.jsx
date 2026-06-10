import "../CssFiles/Home.css";

function Home({ setPage }) {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Khrom<span>.lk</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
        </div>

        <button className="secondary-btn" onClick={() => setPage("signin")}>
          Sign In
        </button>
        <button className="secondary-btn" onClick={() => setPage("signin")}>
          Sign Up
        </button>
      </nav>

      <div className="hero">
        <h1>
          Build <span>modern</span> experiences
        </h1>

        <p>
          A clean, fast and scalable platform designed for modern digital products.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-right">
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;