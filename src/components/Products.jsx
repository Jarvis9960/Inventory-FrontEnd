import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/ProdutContext";
import Product from "./Product";

const Products = () => {
  const product = useContext(AppContext);

  const products = product.products;

  console.log(products);

  console.log();
  return (
    <>
      {products.map((curr) => {
        return <Product value={curr._id} {...curr} />;
      })}
    </>
  );
};

export default Products;
