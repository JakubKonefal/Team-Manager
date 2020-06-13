import React from "react";
import classes from "./MainContentWraper.module.css";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";

const MainContentWraper = ({ children, match }) => (
  <>
    <Toolbar />
    <div className={classes.MainContentWraper}>
      {children}
      <Sidebar match={match} />
    </div>
  </>
);

export default MainContentWraper;
