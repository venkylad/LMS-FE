import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomField } from "../components/CustomFields";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";

const Register = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <div className="w-100 h-[200px] bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center items-center">
        <h2 className="text-6xl text-white">Register</h2>
      </div>
      <div className="flex justify-center mt-6">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "name is too sort")
              .max(30, "must be 15 character or less")
              .required("enter your full name"),
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
              .post(`/api/register`, values)
              .then(() => {
                setSubmitting(true);

                toast.success("User Registered Successfully");
                resetForm();
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
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                />
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
                  className="flex items-center justify-center w-48 h-10 text-lg text-yellow-200 transition bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
                >
                  {loading ? <LoadingOutlined /> : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-6 text-center">
        Already Registered? Then <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
