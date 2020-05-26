import React from "react";
import classes from "./Footer.module.css";
import Logo from "../../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <img className={classes.Footer__Logo} src={Logo} alt="logo" />{" "}
      <span>Copyright &copy; 2020 localCoach. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
