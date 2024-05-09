import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NewTelescopes() {
  const [newTelescopes, setNewTelescopes] = useState([]);
  const [telescopes, setTelescopes] = useState([]);
  const [selectedTelescope, setSelectedTelescope] = useState(null);

  useEffect(() => {
    const fetchNewTelescopes = async () => {
      const telescopesCollectionRef = collection(db, "telescopes");
      const telescopesSnapshot = await getDocs(telescopesCollectionRef);
      const telescopesData = telescopesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTelescopes(telescopesData);
      setNewTelescopes(telescopesData);
    };

    fetchNewTelescopes();
  }, []);

  const handleViewDetails = (telescopeId) => {
    const selectedTelescope = telescopes.find(
      (telescope) => telescope.id === telescopeId
    );
    setSelectedTelescope(selectedTelescope);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <Slider {...settings}>
      {newTelescopes.slice(-3).map((telescope) => (
        <div className="slider-container">
          <Link
            to={`/telescopes/${telescope.id}`}
            onClick={() => {handleViewDetails(telescope.id); scrollToTop();}}
          >
            <img src={telescope.image} alt="img" />
          </Link>
          <div className="slider-text">
            <h3>{telescope.type}</h3>
            <h3>{telescope.mountingType}</h3>
            <h3>$ {telescope.price}</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
}
