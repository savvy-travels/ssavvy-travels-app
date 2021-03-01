import "./App.css";
import routes from "./routes";
import About from "./components/About/About";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <About />
      {routes}
    </div>
  );
}

export default App;
