import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Form from "./components/Form";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/form" element={<Form></Form>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
