import React from "react";
import classes from "./Toolbar.module.css";
import ToolbarItems from "./ToolbarItems/ToolbarItems";

const toolbar = () => (
  <div className={classes.Toolbar}>
    <ToolbarItems />
  </div>
);

export default toolbar;
