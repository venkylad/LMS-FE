import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
