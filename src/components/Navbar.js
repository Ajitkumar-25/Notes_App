import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    props.showAlert("please login to continue", "danger");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-success" href="/">
            Notes-App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/" ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/about"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/contactus"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/contactus"
                >
                  ContactUs
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link to="/signup" className="btn btn-success mx-2">
                  SignUp
                </Link>
                <Link to="/login" className="btn btn-success mx-2">
                  Login
                </Link>
              </form>
            ) : (
              <button onClick={handlelogout} className="btn btn-success mx-2">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
