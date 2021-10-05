import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import { UserContextProvider } from "./context/UserContext";
import UserContext from "./context/UserContext";
import HeroDetails from "./components/HeroDetails/HeroDetails";
import CardsHero from "./components/CardsHero/CardsHero";
import Team from "./components/Team/Team";

function App() {
  const user = useContext(UserContext);
  console.log("app", user.user);
  return (
    <>
      <Router>
        <UserContextProvider>
          <div className="App">
            <Layout>
              <Switch>
                <Route component={HeroDetails} exact path="/heroes/:id"></Route>
                <Route component={CardsHero} exact path="/cards_hero"></Route>
                <Route component={ModalLogin} exact path="/"></Route>
                <Route component={Team} exact path="/team"></Route>
                <Route component={Home} exact path="/home"></Route>
              </Switch>
            </Layout>
          </div>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
