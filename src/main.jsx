import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import "./index.css"
import { Navigate } from 'react-router-dom'
import HomePage from "./Components/HomePage";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/learnly" />} />
          <Route path="/learnly" element={<HomePage />} />
         
        </Routes>
      </HashRouter>
  </React.StrictMode>
 
);