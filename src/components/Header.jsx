import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainHeader = styled.header`
  padding: 1rem 0;
  background-color: #bad7e9;

  .logo {
    height: 3rem;
    width: 3rem;
    margin: 0 7rem;
  }
`;

const BrandName = styled.p`
  text-decoration: none;
  font-size: 1.5rem;
  position: absolute;
  // color: #a6d1e6;
`;

const Header = (props) => {
  const navigate = useNavigate();

  const logout = function (e) {
    e.preventDefault();
    props.setLogout(false);
    props.setLogin(true);
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <>
      <MainHeader>
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
          <div class="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <BrandName>Inventory</BrandName>

              <NavLink to="/">
                <img
                  src="./images/inventory.png"
                  alt="Inventory"
                  className="logo"
                />
              </NavLink>
            </NavLink>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav  mb-2 mb-lg-0">
                {props.Logout && (
                  <li class="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                )}
                {props.Logout && (
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/Addproduct">
                      AddProduct
                    </NavLink>
                  </li>
                )}
                {props.Login && (
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/Login">
                      Login
                    </NavLink>
                  </li>
                )}
                {props.Login && (
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/Loginwithphone">
                      Loginwithotp
                    </NavLink>
                  </li>
                )}
                {props.Login && (
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/Register">
                      Register
                    </NavLink>
                  </li>
                )}
                {props.Logout && (
                  <button onClick={logout} class="btn btn-primary">
                    <NavLink className="nav-link">Logout</NavLink>
                  </button>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </MainHeader>
    </>
  );
};

export default Header;
