import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NewTelescopes() {
  const [newTelescopes, setNewTelescopes] = useState([]);

  useEffect(() => {
    const fetchNewTelescopes = async () => {
      const telescopesCollectionRef = collection(db, "telescopes");
      const telescopesSnapshot = await getDocs(telescopesCollectionRef);
      const telescopesData = telescopesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNewTelescopes(telescopesData);
    };

    fetchNewTelescopes();
  }, []);

  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {newTelescopes.slice(-3).map((telescope) => (
        <div className="slider-container">
          <img src={telescope.image} alt="img" />
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
