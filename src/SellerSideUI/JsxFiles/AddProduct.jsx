import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../Database/supabaseClient";
import "../CssFiles/AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail_url: "",
  });

  const categories = [
    "Courses", "Templates", "E-Books",
    "Software", "Music", "Art & Design",
    "Photography", "Other",
  ];

  // If editing, pre-fill the form
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        thumbnail_url: editingProduct.thumbnail_url || "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.title || !formData.price || !formData.category) {
      setError("Title, price and category are required");
      return;
    }
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    if (editingProduct) {
      // UPDATE existing product
      const { error: updateError } = await supabase
        .from("products")
        .update({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          thumbnail_url: formData.thumbnail_url || null,
        })
        .eq("id", editingProduct.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      // INSERT new product
      const { error: insertError } = await supabase.from("products").insert({
        creator_id: user.id,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        thumbnail_url: formData.thumbnail_url || null,
        status: "active",
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        thumbnail_url: "",
      });
    }
  };

  return (
    <div className="ap-container">

      {/* Top bar */}
      <div className="ap-topbar">
        <div className="ap-logo">Khrom<span>.lk</span></div>
        <div className="ap-topbar-actions">
          <button className="ap-back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
          <button
            className="ap-signout-btn"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/signin");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ap-main">

        {/* Left */}
        <div className="ap-left">
          <p className="ap-label">SELLER DASHBOARD</p>
          <h1 className="ap-heading">
            {editingProduct ? "Update your" : "List your"}<br />
            <span>digital product</span>
          </h1>
          <p className="ap-subtext">
            Reach thousands of buyers across Sri Lanka. Upload your product details and start earning today.
          </p>

          <div className="ap-tips">
            <p className="ap-tips-title">Tips for a great listing</p>
            {[
              "Use a clear, descriptive title",
              "Write a detailed description",
              "Set a competitive price",
              "Choose the right category",
            ].map((tip) => (
              <div key={tip} className="ap-tip-item">
                <div className="ap-tip-dot" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="ap-right">
          <div className="ap-form-card">
            <h2 className="ap-form-title">
              {editingProduct ? "Edit Product" : "Product Details"}
            </h2>

            {error && <div className="ap-error">{error}</div>}

            {success && (
              <div className="ap-success">
                ✅ {editingProduct ? "Product updated!" : "Product listed successfully!"}
              </div>
            )}

            <form className="ap-form" onSubmit={handleSubmit}>

              <div className="ap-field">
                <label>Product Title *</label>
                <input
                  name="title"
                  placeholder="e.g. Ultimate React Course 2024"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="ap-field">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe what buyers will get..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="ap-row">
                <div className="ap-field">
                  <label>Price (USD) *</label>
                  <div className="ap-price-input">
                    <span className="ap-currency">$</span>
                    <input
                      name="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="ap-field">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="ap-field">
                <label>Thumbnail URL <span className="ap-optional">(optional)</span></label>
                <input
                  name="thumbnail_url"
                  placeholder="https://your-image-url.com/image.jpg"
                  value={formData.thumbnail_url}
                  onChange={handleChange}
                />
                {formData.thumbnail_url && (
                  <div className="ap-preview">
                    <img
                      src={formData.thumbnail_url}
                      alt="preview"
                      onError={(e) => e.target.style.display = "none"}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="ap-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingProduct
                  ? "Update Product"
                  : "Publish Product"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;