import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./Database/supabaseClient";

import Home from "./HomeUI/JsxFiles/Home";
import Signin from "./HomeUI/JsxFiles/Signin";
import Signup from "./HomeUI/JsxFiles/Signup";
import Getstarted from "./HomeUI/JsxFiles/Getstarted";
import BrowseStore from "./BuyerSideUI/JsxFiles/BrowseStore";
import ProductDetail from "./BuyerSideUI/JsxFiles/ProductDetail";
import AddProduct from "./SellerSideUI/JsxFiles/AddProduct";
import SellerDashboard from "./SellerSideUI/JsxFiles/SellerDashboard";

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setRole(data?.role);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setRole(data?.role);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif" }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getstarted" element={<Getstarted />} />
      <Route path="/signin" element={session ? <Navigate to={role === "seller" ? "/dashboard" : "/store"} /> : <Signin />} />
      <Route path="/signup" element={session ? <Navigate to={role === "seller" ? "/dashboard" : "/store"} /> : <Signup />} />

      {/* Buyer routes */}
      <Route path="/store" element={session ? <BrowseStore /> : <Navigate to="/signin" />} />
      <Route path="/product" element={session ? <ProductDetail /> : <Navigate to="/signin" />} />

      {/* Seller routes */}
      <Route path="/dashboard" element={session && role === "seller" ? <SellerDashboard /> : <Navigate to="/signin" />} />
      <Route path="/add-product" element={session && role === "seller" ? <AddProduct /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;