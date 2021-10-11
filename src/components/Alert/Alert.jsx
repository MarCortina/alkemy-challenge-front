import React, { useState } from "react";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

const Alert = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div>
      <SweetAlert
        show={show}
        title={text}
        text={text}
        type={type}
        onConfirm={() => setShow(false)}
      />
    </div>
  );
};

export default Alert;
