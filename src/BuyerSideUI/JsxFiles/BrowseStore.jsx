import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFiles/BrowseStore.css";

function BrowseStore() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TEMP DATA (REMOVE AFTER DATABASE)
    setProducts([
      {
        id: 1,
        title: "Web Development Masterclass",
        creator: "Creator Studio",
        price: "$49",
        description: "Learn modern web development."
      },
      {
        id: 2,
        title: "Trading Strategy Course",
        creator: "Trading Academy",
        price: "$79",
        description: "Professional trading education."
      },
      {
        id: 3,
        title: "UI Design Templates",
        creator: "Design Hub",
        price: "$29",
        description: "Premium design resources."
      }
    ]);
  }, []);

  return (
    <div className="store-container">
      <h1>Explore <span>Khrom</span></h1>
      <p className="store-subtitle">Discover digital products from creators</p>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">📦</div>
            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="creator">By {product.creator}</p>
              <p className="product-desc">{product.description}</p>
              <div className="bottom-row">
                <strong>{product.price}</strong>
                <button
                  className="view-btn"
                  onClick={() => navigate("/product", { state: { product } })}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseStore;