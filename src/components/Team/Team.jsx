import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line
import "./team.css";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// const api = process.env.REACT_APP_API_URL;
const Team = () => {
  const [team, setTeam] = useLocalStorage("team", []);
  const [good, setGood] = useLocalStorage("good", []);
  const [bad, setBad] = useLocalStorage("bad", []);
  const [loading, setLoading] = useState(false);
  const totalHero = team.length;

  const onDelete = (id) => {
    setLoading(true);
    const newTeam = team.filter((hero) => hero.id !== id);
    try {
      setTeam(newTeam);
      setGood(good.filter((hero) => hero.id !== id));
      setBad(bad.filter((hero) => hero.id !== id));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const intelligence = team.reduce((acc, cur) => {
    cur.powerstats.intelligence === "null" && (cur.powerstats.intelligence = 0);

    return parseInt(acc) + parseInt(cur.powerstats.intelligence);
  }, 0);

  const strength = team.reduce((acc, cur) => {
    cur.powerstats.strength === "null" && (cur.powerstats.strength = 0);

    return parseInt(acc) + parseInt(cur.powerstats.strength);
  }, 0);

  const speed = team.reduce((acc, cur) => {
    cur.powerstats.speed === "null" && (cur.powerstats.speed = 0);

    return parseInt(acc) + parseInt(cur.powerstats.speed);
  }, 0);
  const durability = team.reduce((acc, cur) => {
    cur.powerstats.durability === "null" && (cur.powerstats.durability = "0");

    return parseInt(acc) + parseInt(cur.powerstats.durability);
  }, 0);

  const power = team.reduce((acc, cur) => {
    cur.powerstats.power === "null" && (cur.powerstats.power = 0);

    return parseInt(acc) + parseInt(cur.powerstats.power);
  }, 0);

  const combat = team.reduce((acc, cur) => {
    cur.powerstats.combat === "null" && (cur.powerstats.combat = 0);

    return parseInt(acc) + parseInt(cur.powerstats.combat);
  }, 0);

  const obj = { combat, power, durability, speed, strength, intelligence };
  const arrayOrdered = Object.entries(obj);
  const ordered = arrayOrdered.sort((a, b) => b[1] - a[1]);
  const totalPower =
    intelligence + strength + speed + durability + power + combat;

  const getTotal = (member) => {
    const total = [
      parseInt(member.powerstats.intelligence),
      parseInt(member.powerstats.strength),
      parseInt(member.powerstats.speed),
      parseInt(member.powerstats.durability),
      parseInt(member.powerstats.power),
      parseInt(member.powerstats.combat),
    ];
    const totalFiltered = total.map((num) => {
      if (isNaN(num)) {
        return 0;
      } else {
        return num;
      }
    });
    return totalFiltered.reduce((acc, cur) => acc + cur);
  };

  const weight = team.reduce((acc, cur) => {
    cur.appearance.weight === "null" && (cur.appearance.weight = 0);
    return parseInt(acc) + parseInt(cur.appearance.weight[1]);
  }, 0);

  const height = team.reduce((acc, cur) => {
    cur.appearance.height === "null" && (cur.appearance.height = 0);
    return parseInt(acc) + parseInt(cur.appearance.height[1]);
  }, 0);

  const average = (value, totalHero) => {
    const cont = Math.round(value / totalHero);
    if (isNaN(cont)) {
      return 0;
    } else {
      return cont;
    }
  };

  useEffect(() => {
    
  }, [team, bad, good]);

  return (
    <div className="in-team-container">
      {loading && <Loader />}
      <div className="header-team">
        <h2>My Team</h2>
        <FontAwesomeIcon icon={faArrowRight} size="2x" />
        <h2>Total Hero: {totalHero}</h2>
      </div>
      <div>
        <div className="team-status">
          {ordered.map((item, index) => {
            return (
              <div key={index}>
                <h3>
                  {item[0]} {item[1] === "null" ? 0 : item[1]}
                </h3>
              </div>
            );
          })}
        </div>
        <div className="totals-team">
          <h2>Total Power: {totalPower}</h2>
          <h2>average team weight: {average(weight, totalHero)}</h2>
          <h2>height team average: {average(height, totalHero)}</h2>
        </div>
      </div>
      <div className="people-container">
        <div className="good-people-container">
          <div className="good-bad-title">good people</div>
          {good?.map((member) => (
            <div key={member.id}>
              <div className="person-container">
                <div className="person-powerstats">
                  <Link
                    to={`/heroes/${member.id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <h3 className="hero-name">{member.name}</h3>
                    <div className="img-container">
                      <img
                        src={member.image.url}
                        alt={member.name}
                        className="img-people"
                      />
                    </div>
                  </Link>

                  <div className="button-people-container">
                    <button
                      className="button-people"
                      onClick={() => onDelete(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="box-power">
                  {Object.entries(member.powerstats)
                    .sort((a, b) => b[1] - a[1])
                    .map((item, index) => {
                      return (
                        <div key={index} className="powerstats-container">
                          <span>
                            {item[0]} {item[1] === "null" ? 0 : item[1]}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="total-hero-container">
                <span>total hero : {getTotal(member)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bad-people-container">
          <div className="good-bad-title">bad people</div>
          {bad?.map((member) => (
            <div key={member.id}>
              <div className="person-container">
                <div className="person-powerstats">
                  <Link
                    to={`/heroes/${member.id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <h3 className="hero-name">{member.name}</h3>
                    <div className="img-container">
                      <img
                        src={member.image.url}
                        alt={member.name}
                        className="img-people"
                      />
                    </div>
                  </Link>

                  <div className="button-people-container">
                    <button
                      className="button-people"
                      onClick={() => onDelete(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="box-power">
                  {Object.entries(member.powerstats)
                    .sort((a, b) => b[1] - a[1])
                    .map((item, index) => {
                      return (
                        <div key={index} className="powerstats-container">
                          <span>
                            {item[0]} {item[1] === "null" ? 0 : item[1]}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="total-hero-container">
                <span>totalHero : {getTotal(member)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
