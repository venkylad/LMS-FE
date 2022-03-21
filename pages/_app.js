import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
