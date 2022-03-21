import { createContext, useReducer, useEffect } from "react";

const intialState = {
  user: null,
};

const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Context = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
