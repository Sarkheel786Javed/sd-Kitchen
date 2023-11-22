import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  var auth = JSON.parse(localStorage.getItem("auth"));
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const [activeLink, setActiveLink] = useState(null);
  const handleColor = (link) => {
    setActiveLink(link);
  };
  const [counter, setCounter] = useState(0);
  const getAllCartItem = async () => {
    if (auth) {
      const userId = auth.user._id;
      try {
        const { data } = await axios.get(`/api/auth/cart/get-cart/${userId}`);
        if (auth.user.role !== 1) {
          setCounter(data.cart.length);
        }
      } catch (error) {
        console.log(error);
        window.alert("Failed to Get All Product");
      }
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getAllCartItem();
  }, [auth]);

  const cartCounter = counter;
  return (
    <div>
      {/* =================Header Started================ */}
      <div className="Header_back"> 
        <nav className="navbar navbar-expand-md  ">
          <div className="container-fluid">
            <Link
              className="navbar-brand d-flex justify-content-center align-items-end"
              to="/"
            >
              <label className="text-light fs-4 fw-bold">
                SD<label className="text-dark">-KITCHEN</label>
              </label>
            </Link>
            <div className="small_cart ">
              <div className="d-flex">
                <div className=" text-light d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                  <div className="Cart_Counter ">{cartCounter}</div>
                </div>
                {auth ? (
                  <div className="dropstart">
                    <button
                      className="btn "
                      style={{ border: "none" }}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-person-square text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item active" to="/">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Something else here
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item btn"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn fw-bold border-dark text-light"
                  >
                    Login
                  </Link>
                )}
                 <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
              </div>
            </div>
           
            <div
              className="collapse navbar-collapse UL_LI_Setting"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link text-light fw-bolder fs-5 ${
                      activeLink === "/" ? "text-light bg-dark rounded " : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/ourmenu"
                    className={`nav-link text-light fw-bolder fs-5 ${
                      activeLink === "/ourmenu"
                        ? "text-light bg-dark rounded"
                        : ""
                    }`}
                    onClick={() => handleColor("/ourmenu")}
                  >
                    Our Menu
                  </Link>
                </li>
                <li className="nav-link "></li>
              </ul>

              <div className="cart text-light d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                <div className="Cart_Counter">{cartCounter}</div>
              </div>
              <li className="nav-link">
                {auth ? (
                  <div className="dropstart">
                    <button
                      className="btn "
                      style={{ border: "none" }}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-person-square text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item active" to="/">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Something else here
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item btn"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn fw-bold border-dark text-light"
                  >
                    Login
                  </Link>
                )}
              </li>
            </div>
          </div>
        </nav>
      </div>
      {/* =================Header End================ */}
    </div>
  );
};

export default Navbar;
