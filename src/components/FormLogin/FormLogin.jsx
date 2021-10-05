import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./formLogin.css";
import { Formik } from "formik";
import UserContext from "../../context/UserContext";

const FormLogin = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("en el formmmmmmm", user);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    if (!values.name) {
      errors.name = "Required";
    }
  };

  const onSubmit = async (values) => {
    try {
      await axios.post(
        `http://challenge-react.alkemy.org/?email=${values.email}&password=${values.password}`
      );
      setUser(values);
      alert("Login success");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     window.location.href = "/home";
  //   }
  // }, [user]);

  return (
    <div>
      <div className="">
        <div className="container">
          <Formik
            initialValues={{ email: "", password: "", name: "" }}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input-form"
                  required
                />
                {errors.name && touched.name && errors.name}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="input-form"
                  required
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="input-form"
                  required
                />
                {errors.password && touched.password && errors.password}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-form"
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
// axios
//   .post(
//     `http://challenge-react.alkemy.org/?email=${values.email}&password=${values.password}`
//   )
// .then((res) => {
//   setUser(values);
// })
// .catch((error) => console.log(error));
