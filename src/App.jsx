import { db } from "./firebase";
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";
import Brand from "./components/Brand";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import OurServices from "./components/OurServices";
import NewTelescopes from "./components/NewTelescopes";
import TelescopeDetails from "./components/TelescopeDetails";
import FeaturedTelescopes from "./components/FeaturedTelescopes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import LogIn from "./components/auth/LogIn";

function App() {
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
      <div className="bg"></div>

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
          path="/"
          element={<FeaturedTelescopes telescopes={telescopes} />}
        />
        <Route path="/telescopes/:id" element={<TelescopeDetails telescopes={telescopes} />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <OurServices />
      <NewTelescopes />
      <FeaturedTelescopes />
      <Brand />

      <Footer />
    </Router>
  );
}

export default App;
