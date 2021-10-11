import React, { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../../useLocalStorage";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import Axios from "axios";
import "./formLogin.css";
import Alert from "../Alert/Alert";
import { Formik } from "formik";
// import UserContext from "../../context/UserContext";
// import getInfo from "../../helpers/verifyToken.helpers";

const FormLogin = ({ setUser, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUserContext] = useLocalStorage("user", []);
  const [alert, setAlert] = useState({
    show: false,  
    message: "",
    type: "",
  });
  const history = useHistory();

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
    setIsLoading(true);
    const { email, password, name } = values;

    try {
      const response = await Axios.post(
        `http://challenge-react.alkemy.org/?email=${values.email}&password=${values.password}`
      );
      const { token } = response.data;

      setUserContext({
        email,
        password,
        name,
        token,
      });
      setUser({
        email,
        password,
        name,
        token,
      });
      setAlert({
        show: true,
        message: "Login Successful",
        type: "success",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }

    setIsLoading(false);
  };
  useEffect(() => {
  }, [user, alert]);

  return (
    <div>
      {isLoading && <Loader />}
      {alert.show && <Alert message={alert.message} type={alert.type} />}
      <div className="login-container">
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

