import "./Home.css";

function Home() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">K</span>
          <span className="logo-text">Khrom</span>
        </div>

        <div className="nav-links">
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Build. Sell. Scale.</h1>

        <div className="hero-buttons">
          <button className="primary-btn">
            Start Selling
          </button>

          <button className="secondary-btn">
            Explore Products
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <a href="/">How it works</a>
        </div>

        <div className="footer-right">
          <span>▶</span>
          <span>✕</span>
          <span>◎</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;