import { useState } from "react";
import Home from "./HomeUI/JsxFiles/Home";
import Signin from "./HomeUI/JsxFiles/Signin";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <Signin setPage={setPage} />}
    </>
  );
}

export default App;