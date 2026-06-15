import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Database/supabaseClient";
import "../CssFiles/SellerDashboard.css";

function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .eq("creator_id", user.id)
      .order("created_at", { ascending: false });

    setProducts(products || []);
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await supabase.from("products").delete().eq("id", productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.total_sales || 0)), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.total_sales || 0), 0);

  return (
    <div className="sd-container">

      {/* Top bar */}
      <div className="sd-topbar">
        <div className="sd-logo">Khrom<span>.lk</span></div>
        <div className="sd-topbar-actions">
          <button className="sd-add-btn" onClick={() => navigate("/add-product")}>
            + Add Product
          </button>
          <button className="sd-signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="sd-main">

        {/* Sidebar */}
        <div className="sd-sidebar">
          <div className="sd-user-info">
            <div className="sd-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <p className="sd-email">{user?.email}</p>
            <span className="sd-role-badge">Seller</span>
          </div>

          <nav className="sd-nav">
            {[
              { id: "products", label: "My Products", icon: "📦" },
              { id: "analytics", label: "Analytics", icon: "📊" },
              { id: "profile", label: "Profile", icon: "👤" },
            ].map(item => (
              <button
                key={item.id}
                className={`sd-nav-item ${activeTab === item.id ? "sd-nav-active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="sd-content">

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div>
              <div className="sd-content-header">
                <h2>My Products</h2>
                <button className="sd-add-btn" onClick={() => navigate("/add-product")}>
                  + Add Product
                </button>
              </div>

              {loading ? (
                <p className="sd-loading">Loading products...</p>
              ) : products.length === 0 ? (
                <div className="sd-empty">
                  <p>📦</p>
                  <p>No products yet</p>
                  <button className="sd-add-btn" onClick={() => navigate("/add-product")}>
                    Add your first product
                  </button>
                </div>
              ) : (
                <div className="sd-products-list">
                  {products.map(product => (
                    <div key={product.id} className="sd-product-row">
                      <div className="sd-product-thumb">
                        {product.thumbnail_url
                          ? <img src={product.thumbnail_url} alt={product.title} />
                          : <span>📦</span>
                        }
                      </div>
                      <div className="sd-product-info">
                        <h3>{product.title}</h3>
                        <p>{product.category} · ${product.price}</p>
                        <span className={`sd-status ${product.status}`}>{product.status}</span>
                      </div>
                      <div className="sd-product-sales">
                        <p className="sd-sales-num">{product.total_sales || 0}</p>
                        <p className="sd-sales-label">sales</p>
                      </div>
                      <div className="sd-product-actions">
                        <button
                          className="sd-edit-btn"
                          onClick={() => navigate("/add-product", { state: { product } })}
                        >
                          Edit
                        </button>
                        <button
                          className="sd-delete-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="sd-content-title">Analytics</h2>
              <div className="sd-stats-grid">
                <div className="sd-stat-card">
                  <p className="sd-stat-label">Total Products</p>
                  <p className="sd-stat-value">{products.length}</p>
                </div>
                <div className="sd-stat-card">
                  <p className="sd-stat-label">Total Sales</p>
                  <p className="sd-stat-value">{totalSales}</p>
                </div>
                <div className="sd-stat-card">
                  <p className="sd-stat-label">Total Revenue</p>
                  <p className="sd-stat-value">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="sd-stat-card">
                  <p className="sd-stat-label">Avg. Price</p>
                  <p className="sd-stat-value">
                    ${products.length > 0
                      ? (products.reduce((s, p) => s + Number(p.price), 0) / products.length).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>

              <div className="sd-products-breakdown">
                <h3>Products Breakdown</h3>
                {products.map(product => (
                  <div key={product.id} className="sd-breakdown-row">
                    <span className="sd-breakdown-title">{product.title}</span>
                    <span className="sd-breakdown-sales">{product.total_sales || 0} sales</span>
                    <span className="sd-breakdown-revenue">
                      ${((product.total_sales || 0) * product.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div>
              <h2 className="sd-content-title">Profile</h2>
              <div className="sd-profile-card">
                <div className="sd-profile-avatar">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="sd-profile-info">
                  <p className="sd-profile-email">{user?.email}</p>
                  <span className="sd-role-badge">Seller</span>
                </div>
              </div>

              <div className="sd-profile-details">
                <div className="sd-detail-row">
                  <span className="sd-detail-label">Email</span>
                  <span className="sd-detail-value">{user?.email}</span>
                </div>
                <div className="sd-detail-row">
                  <span className="sd-detail-label">Member since</span>
                  <span className="sd-detail-value">
                    {new Date(user?.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="sd-detail-row">
                  <span className="sd-detail-label">Total Products</span>
                  <span className="sd-detail-value">{products.length}</span>
                </div>
                <div className="sd-detail-row">
                  <span className="sd-detail-label">Account Status</span>
                  <span className="sd-detail-value" style={{ color: "#4ade80" }}>Active</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;