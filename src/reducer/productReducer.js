const productReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === "DATA") {
    return {
      ...state,
      isLoading: false,
      products: action.payload
    };
  }

  if (action.type === "ERROR") {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productReducer;
