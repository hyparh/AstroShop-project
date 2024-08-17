import { db } from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Footer from "./components/static/Footer";
import Navigation from "./components/Navigation";
import NewTelescopes from "./components/NewTelescopes";
import TelescopeDetails from "./components/TelescopeDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import About from "./components/static/About";
import Home from "./components/Home";
import TelescopeCard from "./components/partials/TelescopeCard";
import Contacts from "./components/static/Contacts";

export default function App() {
  const [telescopes, setDetailsTelescopes] = useState([]);

  useEffect(() => {
    const fetchDetailsTelescopes = async () => {
      try {
        const telescopesCollectionRef = collection(db, "telescopes");
        const telescopesSnapshot = await getDocs(telescopesCollectionRef);
        const telescopesData = telescopesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDetailsTelescopes(telescopesData);
      } catch (error) {
        console.error("Error fetching telescopes:", error);
      }
    };

    fetchDetailsTelescopes();
  }, []);

  return (
    <Router>
      <Navigation />

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
        <Route path="/" element={<Home />} />
        <Route
          path="/telescopes/:id"
          element={<TelescopeDetails telescopes={telescopes} />}
        />
        <Route path="/catalog" element={<TelescopeCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <NewTelescopes />

      <Footer />
    </Router>
  );
}
