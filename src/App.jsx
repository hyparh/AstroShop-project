import Blog from "./Blog";
import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Brand from "./components/Brand";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ClientsSay from "./components/ClientsSay";
import OurServices from "./components/OurServices";
import NewTelescopes from "./components/NewTelescopes";
import FeaturedTelescopes from "./components/FeaturedTelescopes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ContactUs from "./components/ContactUs";

function App() {

  const [newBrand, setNewBrand] = useState("");
  const [newAperture, setNewAperture] = useState(0);

  const [telescopes, setTelescopes] = useState([]);
  const telescopesCollectionRef = collection(db, "telescopes");

  const createTelescope = async () => {
    await addDoc(telescopesCollectionRef, {
      brand: newBrand,
      aperture: Number(newAperture),
    });
  };

  return (
    <Router>
      <Header />

      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="contact-us" element={<ContactUs />} />
      </Routes>
      <OurServices />
      <NewTelescopes />
      <FeaturedTelescopes />
      <ClientsSay />
      <Brand />
      <Blog />

      <Footer />
    </Router>
  );
}

export default App;
