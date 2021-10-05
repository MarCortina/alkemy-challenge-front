import React from "react";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line

const Team = () => {
  const [team, setTeam] = useLocalStorage("team", []);
  const totalHero = team.length;

  return (
    <div>
      <h1>Team</h1>
      <ul>
        {team.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
