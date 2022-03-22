import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  //Axios interceptor to checks user token is expired or not
  // if expires user will be logout
  axios.interceptors.response.use(
    (res) => {
      // if response is 2XX means user token is not expired
      if (res.status === 201) {
        console.log("Posted Successfully");
      }
      return res;
    },
    (err) => {
      let res = err.response;
      // if response is 4XX means user token is expired and need to logout
      if (res === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((res) => {
              console.log("401 error ---> Logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log("axios inteceptor error", err);
              reject(err);
            });
        });
      }

      return Promise.reject(err);
    }
  );

  useEffect(() => {
    //to get CSRF token from server and set it as headers in axios
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      console.log(data, "TOKEN");
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
