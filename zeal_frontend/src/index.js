import React from 'react';
import ReactDOM from 'react-dom';

// Homepage routes all the pages.
import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
import { HashRouter } from "react-router-dom";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

// core styles
import "./scss/volt.scss";

ReactDOM.render(
  <HashRouter>
    <ScrollToTop />
    <Homepage />
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals