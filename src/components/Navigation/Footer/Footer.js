import React from "react";
import classes from "./Footer.module.css";
import Logo from "../../../assets/img/logo-blue.png";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <img className={classes.Footer__Logo} src={Logo} alt="logo" />{" "}
      <span>Copyright &copy; 2020 localCoach. All rights reserved.</span>
    </div>
  );
};

export default Footer;
