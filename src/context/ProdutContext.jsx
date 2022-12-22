import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "https://inventory-wofq.onrender.com/products";

const initialStage = {
  isLoading: false,
  isError: false,
  products: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStage);

  const getProducts = async function (url) {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get(url);
      const productData = await res.data;
      dispatch({ type: "DATA", payload: productData });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };


  useEffect(function () {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}> {children} </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
