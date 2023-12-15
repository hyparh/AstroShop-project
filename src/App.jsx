import { db } from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Brand from "./components/Brand";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import NewTelescopes from "./components/NewTelescopes";
import TelescopeDetails from "./components/TelescopeDetails";
import FeaturedTelescopes from "./components/FeaturedTelescopes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import About from "./components/About";
import TelescopeCard from "./components/partials/TelescopeCard";

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
        console.log("Telescopes fetched:", telescopesData);
      } catch (error) {
        console.error("Error fetching telescopes:", error);
      }
    };

    fetchDetailsTelescopes();
  }, []);

  return (
    <Router>
      <Navigation />
      {location.pathname === "/" && (
        <div className="bg">
          <div class="overlay">
            <h1>Get your second hand telescope in reasonable price</h1>
            <h2>Europe's largest astronomy equipment retailer</h2>
          </div>
        </div>
      )}
      <TelescopeCard />

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
        <Route
          path="/telescopes/:id"
          element={<TelescopeDetails telescopes={telescopes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<FeaturedTelescopes />} />
      </Routes>
      <NewTelescopes />
      <Brand />

      <Footer />
    </Router>
  );
}
