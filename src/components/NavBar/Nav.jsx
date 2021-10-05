import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import "./nav.css";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="nav-container">
      <div className="link-nav-container">
        <Link className="link-nav" to={"/home"}>
          Home
        </Link>
        <a href="#about" className="link-nav">
          About
        </a>
        <a href="#contact" className="link-nav">
          Contact
        </a>
        {user && (
          <button onClick={logout} className="button-logout">
            Logout
          </button>
        )}
      </div>
      {user ? (
        <>
          <div className="user-container">
            <span className="span-nav-name">{user.name}</span>

            {user?.picture?.data?.url ? (
              <>
                <div className="img-facebook-container">
                  <img
                    src={user?.picture?.data?.url}
                    alt="img user"
                    className="w-100 rounded-circle"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="img-facebook-container">
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    size="lg"
                    className="w-100 rounded-circle"
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Nav;
