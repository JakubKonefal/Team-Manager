import React from "react";
import classes from "./MainContentWraper.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const MainContentWraper = ({ children }) => (
  <>
    <Toolbar />
    <div className={classes.MainContentWraper}>{children}</div>
  </>
);

export default MainContentWraper;
