import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./Login";
import Register from "./Register";
import Loginwithotp from "./Loginwithotp";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import Addproduct from "./Addproduct";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsLogin(true);
      setIsLogout(false);
    } else {
      setIsLogin(false);
      setIsLogout(true);
    }
  }, [isLogin]);


  return (
    <>
      <BrowserRouter>
        <Header Login={isLogin} Logout={isLogout} setLogout={setIsLogout} setLogin={setIsLogin}/>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Addproduct" element={<Addproduct />} />
          <Route
            path="/login"
            element={<Login isLogin={setIsLogin} isLogout={setIsLogout} />}
          />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Loginwithphone"
            element={
              <Loginwithotp isLogin={setIsLogin} isLogout={setIsLogout} />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
