import React, { useEffect, useState, useContext } from "react";
import FormLogin from "../FormLogin/FormLogin";
import UserContext from "../../context/UserContext";
import "./modal.css";

const ModalLogin = ({ setUser, location }) => {
  const user = useContext(UserContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [user]);

  return (
    <>
      {show ? (
        <div className="container-modal">
          <div className="modal-login">
            <FormLogin setUser={setUser} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalLogin;
