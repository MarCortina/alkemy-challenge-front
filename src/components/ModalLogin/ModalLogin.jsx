import React, { useEffect, useState, useContext } from "react";
import FormLogin from "../FormLogin/FormLogin";
import UserContext from "../../context/UserContext";
import "./modal.css";

const ModalLogin = () => {
  const context = useContext(UserContext);
  const [show, setShow] = useState(true);


  useEffect(() => {
    if (context?.user !== null) {
      setShow(false);
    }else{
      setShow(true);
    }
  }, [context.user]);


  return (
    <>
      {show ? (
        <div className="container-modal">
          <div className="modal-login">
            <FormLogin />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalLogin;
