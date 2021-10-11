import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line
import "./heroDetails.css";
const api = process.env.REACT_APP_API_URL;

const HeroDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const hero = location.pathname.split("/")[2];

  const [team, setTeam] = useLocalStorage("team", []);
  const [good, setGood] = useLocalStorage("good", []);
  const [bad, setBad] = useLocalStorage("bad", []);
  const [heroDetails, setHeroDetails] = useState({});
  const [heroInTeam, setHeroInTeam] = useState(false);

  const getHeroDetails = async () => {
    const response = await Axios.get(`${api}/${hero}`);
    const { data } = response;
    setHeroDetails(data);
  };

  const checkIfHeroInTeam = (heroId) => {
    const check = team.some((hero) => hero.id === heroId);
    setHeroInTeam(check);
  };

  const addHeroToTeam = () => {
    const sameHero = team.find((hero) => hero.id === heroDetails.id);

    if (sameHero) {
      return alert("Hero already in team");
    } else {
      setTeam([...team, heroDetails]);
    }

    alert(`${heroDetails.name} added to your team!`);
    heroRole(heroDetails);
    history.push("/");
  };

  const heroRole = (heroDetails) => {
    const role = heroDetails.biography.alignment;
    if (good.length <= 0 && role === "good") {
      setGood([heroDetails]);
    } else if (bad.length <= 0 && role === bad) {
      setBad([heroDetails]);
    } else {
      const goodTeam = [...good, heroDetails];
      const badTeam = [...bad, heroDetails];
      role === "good" ? setGood(goodTeam) : setBad(badTeam);
    }
  };

  useEffect(() => {
    getHeroDetails(hero);
    checkIfHeroInTeam(hero);
  }, [team, hero]);

  return (
    <div className="hero-details-container">
      <h3 className="hero-details-name">{heroDetails?.name}</h3>
      <div className="hero-details-data-container">
      <div className="hero-details-image-container">
        <img src={heroDetails?.image?.url} alt={heroDetails?.name} />
      </div>
      <div className="hero-details-info-container">
        <p>rol: {heroDetails?.biography?.alignment}</p>
        <p>publisher: {heroDetails?.biography?.publisher}</p>
        <p>intelligence: {heroDetails?.powerstats?.intelligence}</p>
        <p>strength: {heroDetails?.powerstats?.strength}</p>
        <p>speed: {heroDetails?.powerstats?.speed}</p>
        <p>durability: {heroDetails?.powerstats?.durability}</p>
        <p>power: {heroDetails?.powerstats?.power}</p>
        <p>combat: {heroDetails?.powerstats?.combat}</p>
      </div>
      </div>
      <div className="hero-details-buttons-container">
        {heroInTeam ? null : (
          <button
            value={heroDetails?.id}
            onClick={addHeroToTeam}
            className="hero-details-button"
          >
            Save hero
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroDetails;
