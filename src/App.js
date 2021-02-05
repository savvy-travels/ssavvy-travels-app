import logo from "./logo.svg";
import "./App.css";
import routes from "./routes";
import Header from "./components/Landing/Header/Header";
import { useContext } from "react";
import { Context } from "./context/context";

function App() {
  const context = useContext(Context);
  return (
    <div className="App">
      {/* <Header /> */}
      {routes}
    </div>
  );
}

export default App;
