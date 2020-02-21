import React, { Component } from "react";
import Player from "./Player/Player";
import axios from "axios";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
// import Spinner from "../UI/Spinner/Spinner";
import classes from "./Players.module.css";
import PlayerCreator from "./PlayerCreator/PlayerCreator";

class Players extends Component {
  state = {
    players: null,
    teamName: "",
    addNewPlayerClicked: false,
    submitDisabled: true,
    newPlayerInfo: {
      nr: "",
      firstName: "",
      lastName: "",
      position: "",
      birth: ""
    }
  };

  componentDidMount() {
    console.log(this.props.location.teamId);
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.location.teamId}.json`
      )
      .then(res => {
        const data = res.data;
        console.log(data);
        console.log(data.players);
        if (data.players === undefined) {
          this.setState({ players: [], teamName: data.teamName });
        }
        this.setState({ players: data.players, teamName: data.teamName });
      })
      .catch(err => {
        alert("No data after refresh");
      });
  }

  createPlayerHandler = event => {
    const newPlayer = this.state.newPlayerInfo;
    this.sendData(newPlayer);
    this.componentDidMount();
    event.preventDefault();
  };

  newPlayerClickedHandler = () => {
    if (!this.state.addNewPlayerClicked) {
      this.setState({ addNewPlayerClicked: true });
    }
  };

  changeHandler = event => {
    const inputId = event.target.id;
    const inputValue = event.target.value;
    console.log(event.target.id);
    switch (inputId) {
      case "number":
        this.setState({
          newPlayerInfo: {
            ...this.state.newPlayerInfo,
            nr: inputValue
          }
        });
        break;
      case "firstName":
        this.setState({
          newPlayerInfo: {
            ...this.state.newPlayerInfo,
            firstName: inputValue
          }
        });
        break;
      case "lastName":
        this.setState({
          newPlayerInfo: {
            ...this.state.newPlayerInfo,
            lastName: inputValue
          }
        });
        break;
      case "position":
        this.setState({
          newPlayerInfo: {
            ...this.state.newPlayerInfo,
            position: inputValue
          }
        });
        break;
      case "birth":
        this.setState({
          newPlayerInfo: {
            ...this.state.newPlayerInfo,
            birth: inputValue
          }
        });
        break;
      default:
        return;
    }
  };

  createCancelledHandler = () => {
    this.setState({ addNewPlayerClicked: false });
    console.log(this.state.addNewPlayerClicked);
  };

  sendData = async newPlayer => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.location.teamId}/players.json`,
      newPlayer
    );
    this.componentDidMount();
  };

  render() {
    let players = null;

    if (this.state.players !== null && this.state.players !== undefined) {
      const fetchedPlayers = Object.values(this.state.players);
      players = fetchedPlayers.map((player, index) => {
        return (
          <Player
            key={index}
            id={index}
            number={player.nr}
            firstName={player.firstName}
            lastName={player.lastName}
            position={player.position}
            birth={player.birth}
            teamName={this.state.teamName}
          />
        );
      });
    }

    return (
      <Aux>
        <div className={classes.Players}>{players}</div>
        <PlayerCreator
          active={this.state.addNewPlayerClicked}
          clicked={this.newPlayerClickedHandler}
          change={this.changeHandler}
          createPlayer={this.createPlayerHandler}
          cancelled={this.createCancelledHandler}
        />
      </Aux>
    );
  }
}

export default Players;
