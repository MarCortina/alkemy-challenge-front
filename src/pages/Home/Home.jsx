import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line
import CardsHero from "../../components/CardsHero/CardsHero";
import Loader from "../../components/Loader/Loader";
import "./home.css";
import Team from "../../components/Team/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const api = process.env.REACT_APP_API_URL;

const Home = ({ location }) => {
  const user = useContext(UserContext);
  const [searchHero, setSearchHero] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useLocalStorage("team", []);
  const totalHero = team?.length;

  const onSubmit = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value;
    setSearchHero(search);
    getDataHero(search);
  };

  const getDataHero = async (search) => {
    setLoading(true);
    try {
      const response = await Axios.get(`${api}search/${search}`);
      if (response.data.error) {
        alert(response.data.error);
        setHeroes([]);
      } else {
        setHeroes(response?.data?.results);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {}, [searchHero]);

  return (
    <>
      {loading && <Loader />}
      <div className="home-container">
        <div className="home-container__form">
          <form onSubmit={onSubmit} className="form">
            <div className="search-container">
              <input type="text" name="search" className="search-input"></input>
              <button className="search-button" type="submit">
                <FontAwesomeIcon
                  type="submit"
                  icon={faSearch}
                  size="2x"
                  className="icon-search"
                />
              </button>
            </div>
          </form>
        </div>
        {searchHero ? (
          <div>
            <h2>{searchHero}</h2>
            {heroes.length === 0 ? (
              <p className="text-input">no results, try another name</p>
            ) : (
              <>
                <CardsHero heroes={heroes} />
              </>
            )}
          </div>
        ) : (
          <div>
            <p className="text-input">look for your hero</p>
          </div>
        )}
      </div>
      <div className="team-container">
        {/* <Link to="/team"> */}

        {/* <p className="text-input-team">my teams have {totalHero} heroes</p> */}
        {/* </Link> */}

        <Team team={team} />
      </div>
      {/* <Team /> */}
    </>
  );
};

export default Home;
