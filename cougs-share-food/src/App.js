import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import InputForm from "./pages/inputForm"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/inputForm" element={<InputForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
