import "../CssFiles/Home.css";
import { motion } from "framer-motion";

function Home({ setPage }) {
  return (
    <div className="app">

      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo">
          Khrom<span>.lk</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#">Contact</a>
        </div>

        <div>
          <button className="secondary-btn" onClick={() => setPage("signin")}>
            Sign In
          </button>

          <button className="secondary-btn" onClick={() => setPage("signup")}>
            Sign Up
          </button>
        </div>
      </motion.nav>

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          Build <span>modern</span> experiences
        </h1>

        <p>
          A clean, fast and scalable platform for modern digital products.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </motion.div>

      <motion.div
        id="about"
        className="about-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="about-title">About Khrom</h2>
        <p className="about-text">
          Khrom is a Sri Lankan digital marketplace built for creators and influencers
          to sell digital products like courses, ebooks, templates, and exclusive content.
        </p>
        <p className="about-text">
          We remove technical barriers so creators can launch stores and start selling within minutes.
        </p>
        <p className="about-text">
          Our goal is simple: help creators earn directly from their skills and audience.
        </p>
      </motion.div>

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