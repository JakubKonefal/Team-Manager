import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ToolbarItem.module.css";

const toolbarItem = ({ link, children }) => (
  <NavLink to={link} className={classes.ToolbarItem}>
    {children}
  </NavLink>
);

export default toolbarItem;
