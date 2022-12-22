import React, { useState } from "react";
import styled from "styled-components";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const Wrapper = styled.section`
  padding: 10rem 25rem;
  font-family: "Alegreya", serif;

  .inputTextArea {
    margin: 1rem 0;
    width: 30rem;
  }

  @media only screen and (max-width: 600px) {
    padding: 3rem;
    .inputTextArea {
      width: 22rem;
    }
  }
`;

const AlertSetting = styled.section`
  margin-bottom: 4rem;
`;

const Addproduct = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }
  }, []);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState("");
  const [Image, setImage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("stocks", stocks);
    formData.append("price", price);
    formData.append("Image", Image);

    console.log(Image);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const response = await axios({
        method: "post",
        url: "/addproduct",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const status = response.status;

      if (status > 200 && status < 299) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <>
      <Wrapper>
        {success && (
          <AlertSetting>
            <Alert variant="success">
              <Alert.Heading>Product Added</Alert.Heading>
              <p>you have success added product</p>
            </Alert>
          </AlertSetting>
        )}
        <h2>Add products</h2>

        <form onSubmit={handleInput}>
          <div class="form-floating inputTextArea">
            <input
              type="String"
              class="form-control"
              id="floatingInputValue"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
            <label for="floatingInputValue">Product Name</label>
          </div>
          <div className="form-floating inputTextArea">
            <textarea
              class="form-control"
              id="floatingTextarea"
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            ></textarea>
            <label for="floatingTextarea">Product Description</label>
          </div>
          <div class="form-floating inputTextArea">
            <input
              type="Number"
              class="form-control"
              id="floatingInputValue"
              onChange={(e) => {
                setStocks(e.target.value);
              }}
            />
            <label for="floatingInputValue">Stocks</label>
          </div>
          <div class="form-floating inputTextArea">
            <input
              type="Price"
              class="form-control"
              id="floatingInputValue"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label for="floatingInputValue">Price</label>
          </div>
          <div class="input-group form inputTextArea">
            <input
              type="file"
              class="form-control"
              id="inputGroupFile02"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <label class="input-group-text" for="inputGroupFile02">
              Product Image
            </label>
          </div>
          <button type="submit" className="btn btn-dark">
            Add product
          </button>
        </form>
      </Wrapper>
    </>
  );
};

export default Addproduct;
