import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import classes from "./ToolbarItems.module.css";

const toolbarItems = props => {
  return (
    <div className={classes.ToolbarItems}>
      <ToolbarItem link="/inside">Home</ToolbarItem>
      <ToolbarItem link="/my-account">My account</ToolbarItem>
      <ToolbarItem link="/home">Logout</ToolbarItem>
    </div>
  );
};

export default toolbarItems;
