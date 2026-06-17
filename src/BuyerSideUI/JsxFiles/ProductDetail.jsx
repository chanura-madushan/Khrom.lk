import { useLocation, useNavigate } from "react-router-dom";
import "../CssFiles/ProductDetail.css";

function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="pd-not-found">
        <p>Product not found.</p>
        <button onClick={() => navigate("/store")} className="pd-back-btn">
          ← Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="pd-container">

      {/* Top bar */}
      <div className="pd-topbar">
        <div className="pd-logo">
          Khrom<span>.lk</span>
        </div>
        <button className="pd-back-btn" onClick={() => navigate("/store")}>
          ← Back to Store
        </button>
      </div>

      {/* Main grid */}
      <div className="pd-grid">

        {/* Left */}
        <div className="pd-left">
          <div className="pd-preview">
            <div className="pd-preview-icon">📦</div>
            <p>Digital Product</p>
          </div>
          <div className="pd-tags">
            {["Digital", "Instant Access", "Downloadable"].map(tag => (
              <span key={tag} className="pd-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="pd-right">

          {/* Creator */}
        <div className="pd-creator-row">
            <div className="pd-avatar">{product.category?.charAt(0) || "K"}</div>
            <span className="pd-creator-name">{product.category}</span>
        </div>

          {/* Title */}
          <h1 className="pd-title">{product.title}</h1>

          {/* Description */}
          <p className="pd-description">{product.description}</p>

          {/* Whats included */}
          <div className="pd-includes">
            <p className="pd-includes-title">What's included</p>
            {[
              "Instant digital download",
              "Lifetime access",
              "Free future updates",
              "Community support"
            ].map(item => (
              <div key={item} className="pd-include-item">
                <div className="pd-check">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Price + buttons */}
          <div className="pd-purchase">
            <div className="pd-price-row">
              <span className="pd-price">{product.price}</span>
              <span className="pd-price-label">one-time</span>
            </div>
            <button className="pd-buy-btn">Buy Now</button>
            <button className="pd-wish-btn">Add to Wishlist</button>
            <p className="pd-secure">🔒 Secure checkout · Instant delivery</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;