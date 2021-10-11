import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import "./App.css";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import UserContext from "./context/UserContext";
import HeroDetails from "./components/HeroDetails/HeroDetails";
import CardsHero from "./components/CardsHero/CardsHero";
import Team from "./components/Team/Team";
// import getInfo from "./helpers/verifyToken.helpers";

const App = () => {
  const [user, setUser] = useLocalStorage("user", []);

  return (
    <>
      <UserContext.Provider value={user}>
        <div className="App">
          <Layout setUser={setUser}>
            <Switch>
              {user ? (
                <>
                  <Route exact path="/" render={() => <Home />} />
                  <Route
                    exact
                    path="/heroes/:id"
                    render={() => <HeroDetails />}
                  />
                  <Route
                    exact
                    path="/cards_hero"
                    render={() => <CardsHero />}
                  />
                  <Route exact path="/team" render={() => <Team />} />
                </>
              ) : (
                <Route
                  exact
                  path="/"
                  render={() => <ModalLogin setUser={setUser} />}
                />
              )}
            </Switch>
          </Layout>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
