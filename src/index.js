import "@clayui/css/lib/css/atlas.css";

import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "react-oauth2-code-pkce";
import "./index.css";
import App from "./App";
import { LIFERAY_CLIENT_ID, LIFERAY_HOST_BASE_URL, LIFERAY_OAUTH2_AUTHORIZE_URL, LIFERAY_OAUTH2_TOKEN_URL } from "./utils/constants";

const authConfig = {
  clientId: LIFERAY_CLIENT_ID,
  authorizationEndpoint: `${LIFERAY_HOST_BASE_URL}${LIFERAY_OAUTH2_AUTHORIZE_URL}`,
  tokenEndpoint: `${LIFERAY_HOST_BASE_URL}${LIFERAY_OAUTH2_TOKEN_URL}`,
  redirectUri: `${window.location.origin}/`,
  onRefreshTokenExpire: (event) => event.login(undefined, undefined, "popup")
};

console.log('public url: ', process.env.PUBLIC_URL);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
