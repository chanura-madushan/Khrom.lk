import "../CssFiles/Home.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <button
            className="secondary-btn"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </motion.nav>

      <motion.div
        id="top"
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
          <button
            className="primary-btn"
            onClick={() => navigate("/getstarted")}
          >
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
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

      <motion.div
        id="contact"
        className="contact-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="contact-title">Contact Khrom</h2>

        <p className="contact-text">
          <a href="mailto:support@khrom.lk">
            support@khrom.lk
          </a>
        </p>
      </motion.div>

      <footer className="footer">
        <div className="footer-left">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-right">
          <a href="#top">Back to top</a>
        </div>
      </footer>

    </div>
  );
}

export default Home;