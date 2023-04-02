import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { Provider } from "react-redux";
import { store } from "./Store";
import "./index.css";
import { IntlProvider } from "react-intl";
import siteConfig from "./Config/siteConfig";
import { theme } from "../src/styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**Handling admin screens */
localStorage.setItem(siteConfig.IS_ADMIN, "true");

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <IntlProvider locale="en">
          <App />
        </IntlProvider>
        ,
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <React.StrictMode>
//   <App />
// </React.StrictMode>
