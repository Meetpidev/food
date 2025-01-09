import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import Navbar from "./common/Navbar";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";
import Invent from "./components/Invent";
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/shop" element={<Inventory />} />
        <Route path="/invent" element={<Invent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
