import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useLocalStorage } from "../../useLocalStorage"; // eslint-disable-next-line
import CardsHero from "../../components/CardsHero/CardsHero";
import "./home.css";
const api = process.env.REACT_APP_API_URL;

const Home = () => {
  const user = useContext(UserContext);
  console.log("user en el home", user);
  const [searchHero, setSearchHero] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [team, setTeam] = useLocalStorage("team", []);
  const totalHero = team.length;

  const onSubmit = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value;
    setSearchHero(search);
    getDataHero(search);
  };

  const getDataHero = async (search) => {
    try {
      const response = await Axios.get(`${api}search/${search}`);
      if (response.data.error) {
        alert(response.data.error);
        setHeroes([]);
      } else {
        setHeroes(response?.data?.results);
        console.log("response", response);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  // console.log("searchhero", searchHero);
  // console.log("heroes", heroes);
  // localStorage.setItem("heroes", JSON.stringify(heroes));

  useEffect(() => {}, [searchHero]);
  return (
    <>
      <div className="home-container">
        <h1>home</h1>
        <Link to="/team">
          <p>my teams have {totalHero} heroes</p>
        </Link>

        <form onSubmit={onSubmit}>
          <input type="text" name="search" />
          <button type="submit">search</button>
        </form>

        {searchHero ? (
          <div>
            <h2>{searchHero}</h2>
            {heroes.length === 0 ? (
              <p>No hay resultados. try again</p>
            ) : (
              <>
                <CardsHero heroes={heroes} />
              </>
            )}
          </div>
        ) : (
          <div>
            <h2>start find your hero</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

// {user ? (
//   <div className="container">
//     <div className="row">
//       <div className="col-md-12">
//         <h1>Bienvenido {user.name}</h1>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-12">
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label htmlFor="search">Buscar Heroe</label>
//             <input
//               type="text"
//               className="form-control"
//               id="search"
//               placeholder="Buscar Heroe"
//               name="search"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Buscar
//           </button>
//         </form>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-12">
//         <ul className="list-group">
//           {heroes.map((hero) => (
//             <li className="list-group-item" key={hero.id}>
//               <img
//                 src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
//                 alt={hero.name}
//               />
//               <span>{hero.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   </div>
// ) : (
//   <div className="container">
//     <div className="row">
//       <div className="col-md-12">
//         <h1>Bienvenido</h1>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-12">
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label htmlFor="search">Buscar Heroe</label>
//             <input

//               type="text"
//               className="form-control"
//               id="search"
//               placeholder="Buscar Heroe"
//               name="search"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Buscar
//           </button>
//         </form>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-12">
//         <ul className="list-group">
//           {heroes.map((hero) => (
//             <li className="list-group-item" key={hero.id}>
//               <img
//                 src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
//                 alt={hero.name}
//               />
//               <span>{hero.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   </div>
// )}
