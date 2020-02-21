import React, { Component } from "react";
import classes from "./SideMenu.module.css";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import "../../../../assets/webfonts/all.css";
import Logo from "../../../../assets/img/default_team_logo.png";

class SideMenu extends Component {
  state = {
    menuActive: false,
    currentURL: null
  };

  toggleMenuHandler = () => {
    this.setState({
      menuActive: !this.state.menuActive,
      currentURL: window.location.href
    });
  };

  render() {
    let menuClass = classes.SideMenu;
    if (this.state.menuActive) {
      menuClass = `${classes.SideMenu} ${classes.Active}`;
    }

    console.log(this.state.currentURL);

    let btnDisabled = null;
    if (this.state.currentURL === "http://localhost:3000/my-teams") {
      btnDisabled = true;
    } else {
      btnDisabled = false;
    }

    return (
      <Aux>
        <div className={classes.Hamburger} onClick={this.toggleMenuHandler}>
          <div className={classes.Hamburger__Bar}></div>
          <div className={classes.Hamburger__Bar}></div>
          <div className={classes.Hamburger__Bar}></div>
        </div>
        <ul className={menuClass}>
          <i
            className="fas fa-times"
            style={{
              marginBottom: "30px",
              fontSize: "36px",
              display: "block",
              marginLeft: "10px",
              cursor: "pointer"
            }}
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
      </Aux>
    );
  }
}

export default SideMenu;
