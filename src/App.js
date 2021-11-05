import logo from "./logo.svg";
import "./App.css";
import "./components/HomeComponent.js";
import HomeComponent from "./components/HomeComponent.js";
import PostComponent from "./components/PostComponent.js";
import { render } from "react-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />}/>
          <Route path="/posts/:post" element={<PostComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
