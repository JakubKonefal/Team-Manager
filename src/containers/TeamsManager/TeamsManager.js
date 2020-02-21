import React, { Component } from "react";
import axios from "axios";
import classes from "./TeamsManager.module.css";
import { Link } from "react-router-dom";
import DefaultTeamLogo from "../../assets/img/default_team_logo.png";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import TeamCreator from "../../components/Inside/Teams/TeamCreator/TeamCreator";
// import Spinner from "../../components/UI/Spinner/Spinner";

class TeamsManager extends Component {
  state = {
    teams: [],
    addNewTeamClicked: false,
    submitDisabled: true,
    newTeamName: null,
    newTeamLogo: null
  };

  componentDidMount() {
    axios.get("https://team-manager-b8e8c.firebaseio.com/.json").then(res => {
      console.log(res.data);
      const teamsNames = res.data;
      if (teamsNames === null) {
        console.log("Undefined");
        return;
      }
      const values = Object.values(teamsNames);
      const keys = Object.keys(teamsNames);
      console.log(keys);
      let fetchedTeams = values;
      for (let i = 0; i < keys.length; i++) {
        fetchedTeams[i].id = keys[i];
      }

      const teams = [];
      teams.push(...fetchedTeams);
      this.setState({ teams: teams });
    });
  }

  newTeamClickedHandler = () => {
    if (!this.state.addNewTeamClicked) {
      this.setState({ addNewTeamClicked: true });
    }
  };

  createCancelledHandler = () => {
    this.setState({ addNewTeamClicked: false });
  };

  handleFileSelect = evt => {
    var files = evt.target.files;

    var f = files[0];
    var reader = new FileReader();

    reader.onload = (function(theFile) {
      return function(e) {
        document.getElementById("list").innerHTML = [
          '<img src="',
          e.target.result,
          '" title="',
          theFile.name,
          '" width="100" />'
        ].join("");
      };
    })(f);
    this.setState({ newTeamLogo: files });

    reader.readAsDataURL(f);
  };

  txtChangeHandler = event => {
    this.setState({ newTeamName: event.target.value });

    this.state.newTeamName !== null
      ? this.setState({ submitDisabled: false })
      : this.setState({ submitDisabled: true });
  };

  sendData = async newTeam => {
    await axios.post(
      "https://team-manager-b8e8c.firebaseio.com/.json",
      newTeam
    );
    this.componentDidMount();
  };

  createTeamHandler = event => {
    event.preventDefault();
    console.log(this.state.newTeamName);
    const newTeam = { teamName: this.state.newTeamName, players: [] };
    this.sendData(newTeam);
  };

  // deleteTeamHandler = () => {

  // };

  render() {
    let userTeams = null;
    if (this.state.teams !== null) {
      userTeams = this.state.teams.map(team => {
        return (
          <li key={team.id} className={classes.Team}>
            <img
              src={DefaultTeamLogo}
              className={classes.TeamLogo}
              alt="team-logo"
            />
            <Link
              className={classes.TeamName}
              to={{ pathname: `/my-teams/${team.teamName}`, teamId: team.id }}
            >
              {team.teamName}
            </Link>
            <div className={classes.Buttons}>
              <i
                className="fas fa-minus-circle"
                style={{
                  color: "red",
                  marginBottom: "8px",
                  display: "block"
                }}
              ></i>
              <i className="fas fa-edit" style={{ display: "block" }}></i>
            </div>
          </li>
        );
      });
    }

    console.log(this.state.newTeamLogo);

    return (
      <div>
        <MainContentWraper>
          <ul>
            <li>
              <h1 className={classes.Choose_label}>
                Choose team to manage or create a new one:
              </h1>
            </li>
            {userTeams}
            <TeamCreator
              active={this.state.addNewTeamClicked}
              btnDisabled={this.state.submitDisabled}
              txtChange={this.txtChangeHandler}
              createTeam={this.createTeamHandler}
              addImg={this.handleFileSelect}
              cancelled={this.createCancelledHandler}
              clicked={this.newTeamClickedHandler}
            />
          </ul>
        </MainContentWraper>
      </div>
    );
  }
}

export default TeamsManager;
