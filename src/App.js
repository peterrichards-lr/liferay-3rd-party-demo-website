import "./App.css";

import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { ClayIconSpriteContext } from "@clayui/icon";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import { ROUTE_REDIRECT_URL } from "./utils/constants";

const spritemap = "./icons.svg";

function App() {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <div className="App">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <Route exact path="/">
              <Redirect to={ROUTE_REDIRECT_URL} />
            </Route>

            <Route exact path="/home">
              <HomePage />
            </Route>

            <Route exact path="/details">
              <DetailsPage />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </ClayIconSpriteContext.Provider>
  );
}

export default App;
