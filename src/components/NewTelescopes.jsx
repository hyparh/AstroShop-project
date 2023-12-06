import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, limit } from "firebase/firestore";
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

  // useEffect(() => {
  //   const fetchNewTelescopes = async () => {
  //     const telescopesCollectionRef = collection(db, "telescopes");
  //     const query = orderBy(telescopesCollectionRef, "timestamp", "desc");
  //     const limitedQuery = limit(query, 3);

  //     console.log("Inside useEffect");

  //     const telescopesSnapshot = await getDocs(limitedQuery);
  //     const telescopesData = telescopesSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setNewTelescopes(telescopesData);
  //   };

  //   fetchNewTelescopes();
  // }, []);

  return (
    <Slider {...settings}>
      {newTelescopes.map((telescope) => (
        <div className="slider-container">
          <img src={telescope.image} alt="img" />
          <h3>{telescope.type}</h3>
          <h3>{telescope.price}</h3>
          <h3>{telescope.userId}</h3>
        </div>
      ))}
    </Slider>

    // <section id="new-cars" className="new-cars">
    //   <div className="container">
    //     <div className="section-header">
    //       <p>
    //         checkout <span>the</span> latest telescopes
    //       </p>
    //       <h2>newly added</h2>
    //     </div>
    //     {/*/.section-header*/}
    //     <div className="new-cars-content">
    //       <div className="owl-carousel owl-theme" id="new-cars-carousel">
    //         {newTelescopes.map((telescope) => (
    //           <div className="new-cars-item">
    //             <div className="single-new-cars-item">
    //               <div className="row">
    //                 <div className="col-md-7 col-sm-12">
    //                   <div className="new-cars-img">
    //                     <img src={telescope.image} alt="img" />
    //                   </div>
    //                 </div>
    //                 <div className="col-md-5 col-sm-12">
    //                   <div className="new-cars-txt">
    //                     <h2>
    //                       <a href="#">CGX-L Equatorial 1400 HD Telescope</a>
    //                     </h2>
    //                     <p>
    //                       You can count on Celestron Premier Select Dealers to
    //                       offer an extensive assortment of Celestron products in
    //                       stock for immediate delivery.
    //                     </p>
    //                     <br></br>
    //                     <li>14" EdgeHD Optics</li>
    //                     <li>Celestron premium StarBright XLT coatings</li>
    //                     <li>CGX-L computerized Equatorial mount</li>
    //                     <li>
    //                       Heavy Duty stainless steel tripod adjustable from 38 -
    //                       55
    //                     </li>
    //                     <li>
    //                       9x50 finderscope with quick release bracket to help
    //                       accurately find objects
    //                     </li>
    //                     <li>
    //                       2" Star diagonal provides more comfortable viewing
    //                       position when observing objects that are high in the
    //                       sky
    //                     </li>
    //                     <p className="new-cars-para2">
    //                       <b>
    //                         <h4>$ {telescope.price}</h4>
    //                       </b>
    //                     </p>
    //                     <button
    //                       className="welcome-btn new-cars-btn"
    //                       onclick="window.location.href='#'"
    //                     >
    //                       view details
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
