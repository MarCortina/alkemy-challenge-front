import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cardsHero.css";

const CardsHero = ({ heroes }) => {
  const [heroSelected, setHeroSelected] = useState(null);

  const handleClick = (hero) => {
    setHeroSelected(hero);
  };

  return (
    <div className="cards-container">
      {heroes?.map((hero, index) => (
        <Link
          key={index}
          to={`/heroes/${hero.id}`}
          onClick={handleClick}
          value={heroSelected}
        >
          <div className="card">
            <h3>{hero.name}</h3>
            <div className="img-card-container">
              <img src={hero.image.url} alt={hero.name} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardsHero;
