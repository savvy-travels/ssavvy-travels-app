import "./App.css";
import routes from "./routes";

import { useContext } from "react";
import { Context } from "./context/context";

function App() {
  
  return (
    <div className="App">
     
      {routes}
    </div>
  );
}

export default App;
