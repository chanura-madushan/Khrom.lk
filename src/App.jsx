import { Routes, Route } from "react-router-dom";

import Home from "./HomeUI/JsxFiles/Home";
import Signin from "./HomeUI/JsxFiles/Signin";
import Signup from "./HomeUI/JsxFiles/Signup";
import Getstarted from "./HomeUI/JsxFiles/Getstarted";
import BrowseStore from "./BuyerSideUI/JsxFiles/BrowseStore";
import ProductDetail from "./BuyerSideUI/JsxFiles/ProductDetail";   

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getstarted" element={<Getstarted />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/store" element={<BrowseStore />} />
      <Route path="/product" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;