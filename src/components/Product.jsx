import React, { useState } from "react";
import styled from "styled-components";

const ButtonArea = styled.div`
  margin: 1rem 0;
`;

const Product = (curr) => {
  const [buttonValue, setButtonValue] = useState("");

  console.log(curr);
  const { price, productDescription, productName, stocks } = curr;

  const image = curr.image.data.data;

  return (
    <>
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col">
            <div class="card text-black">
              <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
              <img class="card-img-top" alt={productName} />
              <div class="card-body">
                <div class="text-center">
                  <h5 class="card-title">{productName}</h5>
                  <p class="text-muted mb-4">{productDescription}</p>
                </div>
                <div>
                  <div class="d-flex justify-content-between">
                    <span>Stocks</span>
                    <span>{stocks}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Price</span>
                    <span>₹{price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
