import React, { useEffect } from "react";
import styled from "styled-components";
import Products from "./components/Products";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 8rem 8rem;
  text-align: center;
  background-color: #d9cab3;

  .intro {
    font-family: "Caveat", cursive;
  }

  .description {
    font-family: "Alegreya", serif;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }
  }, []);

  return (
    <>
      <Wrapper>
        <h1 className="intro">Welcome to my Inventory</h1>
        <p className="description"> Explore the App</p>
      </Wrapper>
      <Products />
    </>
  );
};

export default Home;
