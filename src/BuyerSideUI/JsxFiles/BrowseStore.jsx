import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Database/supabaseClient";
import "../CssFiles/BrowseStore.css";

function BrowseStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="store-container">

      {/* Top bar */}
      <div className="store-topbar">
        <div className="store-logo">
          Khrom<span>.lk</span>
        </div>
        <div className="topbar-actions">
          <button className="home-btn" onClick={() => navigate("/")}>
            ← Home
          </button>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="store-header">
        <h1>Explore <span>Khrom</span></h1>
        <p className="store-subtitle">Discover digital products from creators</p>
      </div>

      {/* Products */}
      {loading ? (
        <p style={{ padding: "0 40px", color: "#9ca3af" }}>Loading products...</p>
      ) : products.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
          <p style={{ fontSize: "2rem", marginBottom: "10px" }}>📦</p>
          <p>No products available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                {product.thumbnail_url
                  ? <img src={product.thumbnail_url} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : "📦"
                }
              </div>
              <div className="product-info">
                <h2>{product.title}</h2>
                <p className="creator">{product.category}</p>
                <p className="product-desc">{product.description}</p>
                <div className="bottom-row">
                  <strong>${product.price}</strong>
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
      )}
    </div>
  );
}

export default BrowseStore;