import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";

function App() {
  const [alert, setAlert] = useState("");
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert}  />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup   showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login  showAlert={showAlert} />} />
            <Route exact path="/contactus" element={<ContactUs/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </NoteState>
  );
}

export default App;
