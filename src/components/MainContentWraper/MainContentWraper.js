import React from "react";
import classes from "./MainContentWraper.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";

const MainContentWraper = ({ children }) => (
  <>
    <Toolbar />
    <div className={classes.MainContentWraper}>
      {children}
      <Sidebar />
    </div>
  </>
);

export default MainContentWraper;
