import React, { Component } from "react";
import classes from "./SideMenu.module.css";
import "../../../../assets/webfonts/all.css";
import Logo from "../../../../assets/img/default_team_logo.png";

class SideMenu extends Component {
  state = {
    menuActive: false,
    currentURL: null
  };

  handleMenuToggle = () => {
    this.setState({
      menuActive: !this.state.menuActive,
      currentURL: window.location.href
    });
  };

  render() {
    const menuClass = this.state.menuActive
      ? `${classes.SideMenu} ${classes.Active}`
      : classes.SideMenu;
    const btnDisabled =
      this.state.currentURL === "http://localhost:3000/my-teams" ? true : false;

    return (
      <>
        <div className={classes.Hamburger} onClick={this.handleMenuToggle}>
          <div className={classes.Hamburger__Bar}></div>
          <div className={classes.Hamburger__Bar}></div>
          <div className={classes.Hamburger__Bar}></div>
        </div>
        <ul className={menuClass}>
          <i
            className={`fas fa-times ${classes.Icon__Close}`}
            onClick={this.toggleMenuHandler}
          ></i>
          <div className={classes.ActiveTeam}>
            <img src={Logo} className={classes.TeamLogo} alt="Logo" />
            <p>Team Name</p>
          </div>
          <li className={classes.SideMenu__Item}>
            <i className="fas fa-users"></i>
            <button className={classes.Option_Label}>Teams</button>
          </li>
          <li className={classes.SideMenu__Item}>
            <i className="fas fa-user"></i>
            <button disabled={btnDisabled} className={classes.Option_Label}>
              Players
            </button>
          </li>
          <li className={classes.SideMenu__Item}>
            <i className="fas fa-futbol"></i>
            <button disabled={btnDisabled} className={classes.Option_Label}>
              Trainings
            </button>
          </li>
          <li className={classes.SideMenu__Item}>
            <i className="fa fa-table" aria-hidden="true"></i>
            <button disabled={btnDisabled} className={classes.Option_Label}>
              Table
            </button>
          </li>
          <li className={classes.SideMenu__Item}>
            <i className="fas fa-cog"></i>
            <button disabled={btnDisabled} className={classes.Option_Label}>
              Settings
            </button>
          </li>
        </ul>
      </>
    );
  }
}

export default SideMenu;
