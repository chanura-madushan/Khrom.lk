import { useState } from "react";
import Home from "./HomeUI/JsxFiles/Home";
import Signin from "./HomeUI/JsxFiles/Signin";
import Signup from "./HomeUI/JsxFiles/Signup";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <Signin setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
    </>
  );
}

export default App;