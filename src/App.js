import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";
import { ClayIconSpriteContext } from "@clayui/icon";

import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import LogoutPage from "./pages/LogoutPage";

import { PUBLIC_URL } from './utils/constants'

const spritemap = "./icons.svg";

function App() {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <div className="App">
        <HashRouter basename={PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/details">
              <DetailsPage />
            </Route>

            <Route exact path="/logout">
              <LogoutPage />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </ClayIconSpriteContext.Provider>
  );
}

export default App;
