import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";
import CreateTelescope from "./crud/CreateTelescope";
import LogOut from "./auth/LogOut";

export default function Header() {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <section id="home" className="welcome-hero">
      {/* top-area Start */}
      <div className="top-area">
        <div className="header-area">
          {/* Start Navigation */}
          <nav
            className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy"
            data-minus-value-desktop={70}
            data-minus-value-mobile={55}
            data-speed={1000}
          >
            <div className="container">
              {/* Start Header Navigation */}
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navbar-menu"
                >
                  <i className="fa fa-bars" />
                </button>
                <a className="navbar-brand" href="index.html">
                  astro shop
                  <span />
                </a>
              </div>
              {/*/.navbar-header*/}
              {/* End Header Navigation */}
              {/* Collect the nav links, forms, and other content for toggling */}
              <div
                className="collapse navbar-collapse menu-ui-design"
                id="navbar-menu"
              >
                <ul
                  className="nav navbar-nav navbar-right"
                  data-in="fadeInDown"
                  data-out="fadeOutUp"
                >
                  <li className=" scroll active">
                    <a href="#home">home</a>
                  </li>
                  {user ? (
                    <>
                      <li>
                        <a>
                          <CreateTelescope />
                        </a>
                      </li>
                      <li>
                        <a>
                          <LogOut onLogout={updateUser}/>
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a>
                          <LogIn onLogin={updateUser} />
                        </a>
                      </li>
                      <li>
                        <a>
                          <Register onLogin={updateUser} />
                        </a>
                      </li>
                    </>
                  )}
                  <li className="scroll">
                    <a href="#service">service</a>
                  </li>
                  <li className="scroll">
                    <a href="#featured-telescopes">telescopes catalog</a>
                  </li>
                  <li className="scroll">
                    <a href="#new-cars">newly added</a>
                  </li>
                  <li className="scroll">
                    <a href="#brand">brands</a>
                  </li>
                  <li className="scroll">
                    <a href="#contact">contact</a>
                  </li>
                </ul>
                {/*/.nav */}
              </div>
              {/* /.navbar-collapse */}
            </div>
            {/*/.container*/}
          </nav>
          {/*/nav*/}
          {/* End Navigation */}
        </div>
        {/*/.header-area*/}
        <div className="clearfix" />
      </div>
      {/* /.top-area*/}
      {/* top-area End */}
      <div className="container">
        <div className="welcome-hero-txt">
          <h2>get your telescope in resonable price</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/contact-us">
            <button className="welcome-btn">contact us</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="model-search-content">
              <div className="row">
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>select type</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">type</option>
                        <option value={2018}>reflector</option>
                        <option value={2017}>refractor</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                  <div className="single-model-search">
                    <h2>goto control</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">push to</option>
                        <option value="sedan">no</option>
                        <option value="van">yes</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                </div>
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>type of build</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">newton</option>
                        <option value="toyota">schmidt-cassegrain</option>
                        <option value="holden">achromat</option>
                        <option value="maecedes-benz">apochromat</option>
                        <option value="maecedes-benz">astrograph</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                  <div className="single-model-search">
                    <h2>aperture</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">70 - 90 mm</option>
                        <option value="something">114 - 130 mm</option>
                        <option value="something">150 - 200 mm</option>
                        <option value="something">280 - 305 mm</option>
                        <option value="something">305 - 356 mm</option>
                        <option value="something">&gt; 356 mm</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                </div>
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>mounting type</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">azimuthal</option>
                        <option value="kia-rio">dobson</option>
                        <option value="mitsubishi">equatorial</option>
                        <option value="ford">no mount</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                  <div className="single-model-search">
                    <h2>select price</h2>
                    <div className="model-select-icon">
                      <select className="form-control">
                        <option value="default">price</option>
                        <option value="$0.00">110 - 210 $</option>
                        <option value="$0.00">210 - 320 $</option>
                        <option value="$0.00">320 - 540 $</option>
                        <option value="$0.00">540 - 1070 $</option>
                        <option value="$0.00">1070 - 2140 $</option>
                        <option value="$0.00">2140 - 5350 $</option>
                        <option value="$0.00">&gt; 5350 $</option>
                      </select>
                      {/* /.select*/}
                    </div>
                    {/* /.model-select-icon */}
                  </div>
                </div>
                <div className="col-md-2 col-sm-12">
                  <div className="single-model-search text-center">
                    <button
                      className="welcome-btn model-search-btn"
                      onclick="window.location.href='#'"
                    >
                      search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
