import React from "react";
import classes from "./MainContentWraper.module.css";

const MainContentWraper = ({ children }) => (
  <div className={classes.MainContentWraper}>{children}</div>
);

export default MainContentWraper;
