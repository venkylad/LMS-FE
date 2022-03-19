import React from "react";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomField } from "../components/CustomFields";
import axios from "axios";

const Register = () => {
  return (
    <div>
      <Navbar />
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
              .required("enter you your full name"),
            email: Yup.string()
              .email("invalid email")
              .required("email is required"),
            password: Yup.string()
              .min(6, "password is too sort")
              .required("Password rewuired"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await axios
              .post(`http://localhost:8000/api/register`, values)
              .then((res) => {
                console.log(res);

                setSubmitting(true);
                alert("Your Message Submitted Successfully");
                resetForm();
              })
              .catch((err) => {
                console.log(err, err.message);
                alert("some error occured");
                resetForm();
                setSubmitting(false);
              });
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-col space-y-6 justify-center items-center">
                <CustomField
                  className="border border-black rounded py-2 px-3 md:w-[400px] sm:w-100"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                />
                <CustomField
                  className="border border-black rounded py-2 px-3 md:w-[400px] sm:w-100"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                />
                <CustomField
                  className="border border-black rounded py-2 px-3 md:w-[400px] sm:w-100"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
                <button
                  type="submit"
                  className="w-40 h-8 rounded-md font-semibold text-yellow-100 bg-blue-400 hover:bg-blue-500 transition hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
