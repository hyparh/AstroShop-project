import Blog from "./Blog";
import React, { useState } from "react";
import Brand from "./components/Brand";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ClientsSay from "./components/ClientsSay";
import OurServices from "./components/OurServices";
import NewTelescopes from "./components/NewTelescopes";
import FeaturedTelescopes from "./components/FeaturedTelescopes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ContactUs from "./components/ContactUs";

function App() {
  const [hideContent, setHideContent] = useState(false);

  const notify = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Router>
      <button onClick={notify}>Notify !</button>
      <button onClick={() => setHideContent(!hideContent)}>
        Toggle Content
      </button>
      <Header />
      <Routes>
        <Route path="contact-us" element={hideContent ? null : <ContactUs />} />
      </Routes>
      {!hideContent && (
        <>
          <LogIn />
          <Register />
          <OurServices />
          <NewTelescopes />
          <FeaturedTelescopes />
          <ClientsSay />
          <Brand />
          <Blog />
        </>
      )}
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
