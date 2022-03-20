import { useField } from "formik";
import React from "react";

export const CustomField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input className="border border-blue-600" {...field} {...props} />
      {meta.touched && meta.error ? (
        <p style={{ color: "red", fontWeight: "lighter", fontSize: "12px" }}>
          {meta.error.toUpperCase()}
        </p>
      ) : null}
    </>
  );
};

export const CustomTextArea = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <p style={{ color: "red", fontWeight: "lighter", fontSize: "12px" }}>
          {meta.error.toUpperCase()}
        </p>
      ) : null}
    </>
  );
};
