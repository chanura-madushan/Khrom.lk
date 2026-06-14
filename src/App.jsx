import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./Database/supabaseClient";

import Home from "./HomeUI/JsxFiles/Home";
import Signin from "./HomeUI/JsxFiles/Signin";
import Signup from "./HomeUI/JsxFiles/Signup";
import Getstarted from "./HomeUI/JsxFiles/Getstarted";
import BrowseStore from "./BuyerSideUI/JsxFiles/BrowseStore";
import ProductDetail from "./BuyerSideUI/JsxFiles/ProductDetail";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontSize: "1rem",
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getstarted" element={<Getstarted />} />

      {/* Redirect to /store if already logged in */}
      <Route path="/signin" element={session ? <Navigate to="/store" /> : <Signin />} />
      <Route path="/signup" element={session ? <Navigate to="/store" /> : <Signup />} />

      {/* Redirect to /signin if not logged in */}
      <Route path="/store" element={session ? <BrowseStore /> : <Navigate to="/signin" />} />
      <Route path="/product" element={session ? <ProductDetail /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;