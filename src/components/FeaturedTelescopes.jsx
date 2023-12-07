import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export default function FeaturedTelescopes() {
  const [telescopes, setTelescopes] = useState([]);

  useEffect(() => {
    const fetchTelescopes = async () => {
      const telescopesCollectionRef = collection(db, "telescopes");
      const telescopesSnapshot = await getDocs(telescopesCollectionRef);
      const telescopesData = telescopesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTelescopes(telescopesData);
    };

    fetchTelescopes();
  }, []);

  return (
    <section id="featured-telescopes" className="featured-telescopes">
      <div className="container">
        <div className="section-header">
          <p>
            checkout <span>the</span> telescopes catalog
          </p>
          <h2>telescopes catalog</h2>
        </div>
        <div className="featured-telescopes-content">
          <div className="row">
            {telescopes.map((telescope) => (
              <div key={telescope.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-featured-telescopes">
                  <div className="featured-img-box">
                    <div className="featured-telescopes-img">
                      <img src={telescope.image} alt="telescope" />
                    </div>
                    <div className="featured-model-info">
                      <p>
                        type: {telescope.type}{" "}
                        <span className="featured-mi-span">
                          {telescope.aperture} mm
                        </span>
                        {/* Include other telescope properties as needed */}
                      </p>
                    </div>
                  </div>
                  <div className="featured-telescopes-txt">
                    <h2>
                      {/* Use Link to navigate to the details page */}
                      <a href="#">{telescope.buildType}</a>
                      <Link to={`/telescopes/${telescope.id}`}>
                        <button>Details</button>
                      </Link>
                    </h2>
                    <h3>${telescope.price}</h3>
                    <p className="description-catalog">{telescope.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
