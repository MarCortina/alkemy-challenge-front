import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faHome,
  faAddressCard,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./nav.css";

const Nav = ({ setUser }) => {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const logout = () => {
    setIsLoading(true);
    try {
      setUser(null);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {}, [user]);
  return (
    <div className="nav-container">
      {isLoading && <Loader />}
      <div className="link-nav-container">
        <Link className="link-nav" to={"/"}>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <div>
            Home
          </div>
        </Link>

        <a href="https://campus.alkemy.org/challenges" className="link-nav">
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
          <div>About</div>
        </a>
        <a href="https://www.linkedin.com/in/mar-cortina/" className="link-nav">
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
          <div>Contact</div>
        </a>
        {user && (
          <button onClick={logout} className="button-logout">
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            <div>Logout</div>
          </button>
        )}
      </div>
      {user &&(
        <>
          <div className="user-container">
            <span className="span-nav-name">{user.name}</span>

            <div className="icon-user-login">
              <FontAwesomeIcon
                icon={faUserCheck}
                size="2x"
              />
            </div>
          </div>
        </>
      ) }
    </div>
  );
};

export default Nav;
