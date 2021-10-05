import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cardsHero.css";

const CardsHero = ({ heroes }) => {
  console.log("EROESSSSSSSSSS", heroes);
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

// {searchHero ? (
//   <div>
//     <h2>{searchHero}</h2>
//     {heroes.length === 0 ? (
//       <p>No hay resultados. try again</p>
//     ) : (
//       <>
//         <CardsHero heroes={heroes} />
//       </>
//     )}
//   </div>
// ) : (
//   <div>
//     <h2>start find your hero</h2>
//   </div>
// )}

// const getDataHero = async (search) => {
//   try {
//     const response = await Axios.get(`${api}search/${search}`);
//     if (response.data.error) {
//       alert(response.data.error);
//       setHeroes([]);
//     } else {
//       setHeroes(response?.data?.results);
//       console.log("response", response);
//     }
//   } catch (error) {
//     alert(error);
//     console.log(error);
//   }
// };