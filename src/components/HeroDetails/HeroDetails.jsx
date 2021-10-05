import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line
import "./heroDetails.css";
const api = process.env.REACT_APP_API_URL;

const HeroDetails = () => {
  const location = useLocation();
  const hero = location.pathname.split("/")[2];

  const [team, setTeam] = useLocalStorage("team", []);
  const [heroDetails, setHeroDetails] = useState({});

  const getHeroDetails = async () => {
    const response = await Axios.get(`${api}/${hero}`);
    setHeroDetails(response.data);
  };

  useEffect(() => {
    getHeroDetails(hero);
    console.log("TEAMMMMMM", team);
  }, [team]);
  console.log("detailssss", heroDetails);

  return (
    <div>
      <button
        onClick={() => {
          window.history.back();
        }}
      >
        back to home
      </button>

      <h3>{heroDetails?.name}</h3>
      <img src={heroDetails?.image?.url} alt={heroDetails?.name} />
      <p>{heroDetails?.biography?.alignment}</p>
      <p>{heroDetails?.biography?.publisher}</p>
      <button
        value={heroDetails?.id}
        onClick={() => {
          setTeam([...team, heroDetails]);
        }}
      >
        Save to local storage
      </button>
    </div>
  );
};

export default HeroDetails;
