import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomField } from "../components/CustomFields";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <div className="w-100 h-[200px] bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center items-center">
        <h2 className="text-6xl text-white">Login</h2>
      </div>
      <div className="flex justify-center mt-6">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("invalid email")
              .required("email is required"),
            password: Yup.string()
              .min(6, "password is too sort")
              .required("Password required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            await axios
              .post(`/api/login`, values)
              .then((res) => {
                setSubmitting(true);
                toast.success("User LoggedIn Successfully");

                //dispatching action to save user login response details
                dispatch({
                  type: "LOGIN",
                  payload: res.data,
                });
                //to save user res in localstorage, need to stringfy data
                window.localStorage.setItem("user", JSON.stringify(res.data));
                resetForm();
                router.push("/");
              })
              .catch((err) => {
                toast.error(err.response.data);
                setSubmitting(false);
              });
            setLoading(false);
          }}
        >
          {() => (
            <Form className="w-full">
              <div className="flex flex-col items-center justify-center space-y-6">
                <CustomField
                  className="border-2 border-blue-400 rounded-lg py-2 px-3 md:w-[500px] sm:w-100"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                />
                <CustomField
                  className="border-2 border-blue-400 rounded-lg py-2 px-3 md:w-[500px] sm:w-100"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center w-48 h-10 text-lg text-yellow-200 transition duration-200 bg-blue-500 rounded-lg hover:font-semibold hover:bg-blue-600 hover:scale-105"
                >
                  {loading ? <LoadingOutlined /> : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-6 text-center">
        Haven&apos;t Registered Yet? Then <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
