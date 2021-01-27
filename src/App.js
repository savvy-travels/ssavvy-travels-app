import logo from './logo.svg';
import './App.css';
import routes from './routes';
import Header from './components/Landing/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
