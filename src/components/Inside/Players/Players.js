import React, { Component } from "react";
import Player from "./Player/Player";
import axios from "axios";
import { storage, database } from "../../../firebase/firebase";
import classes from "./Players.module.css";
import PlayerCreator from "./PlayerCreator/PlayerCreator";

class Players extends Component {
  state = {
    teamName: this.props.location.teamName,
    players: null,
    playerCreatorActive: false,
    newPlayerInfo: {
      number: "",
      firstName: "",
      lastName: "",
      position: "",
      birth: "",
      photo: null
    },
    previewFile: null,
    uploadedImage: null,
    imageUploadProgress: ""
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}.json`
      )
      .then(res => {
        const data = res.data;
        if (!data.players) {
          this.setState({ players: [], teamName: data.teamName });
        } else {
          const players = data.players;
          const playersIds = Object.keys(players);
          const playersArray = Object.values(players);
          for (let i = 0; i < playersIds.length; i++) {
            playersArray[i].playerId = playersIds[i];
            playersArray[i].teamName = data.teamName;
          }
          const updatedPlayers = [];
          updatedPlayers.push(...playersArray);
          this.setState({ players: updatedPlayers, teamName: data.teamName });
        }
      });
  }

  handlePlayerCreatorOpen = () => {
    if (!this.state.playerCreatorActive) {
      this.setState({ playerCreatorActive: true });
    }
  };

  handlePlayerCreatorClose = () => {
    this.setState({ playerCreatorActive: false });
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newPlayerInfo: {
        ...this.state.newPlayerInfo,
        [id]: value
      }
    });
  };

  handleImageSelect = e => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      uploadedImage: file
    });
  };

  handlePlayerCreate = uploadedImageUrl => {
    const newPlayer = { ...this.state.newPlayerInfo, photo: uploadedImageUrl };
    this.handlePassDataToServer(newPlayer);
  };

  handlePlayerDelete = (playerId, teamName, playerFirebaseName) => {
    database
      .ref(`${this.props.match.params.teamId}/players/${playerId}`)
      .remove()
      .then(() => {
        this.state.players
          ? this.componentDidMount()
          : this.setState({ players: [] });
      });
    storage
      .ref(`images/teams/${teamName}/players/${playerFirebaseName}`)
      .delete();
  };

  handlePassDataToServer = async newPlayer => {
    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/players.json`,
      newPlayer
    );
    this.componentDidMount();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { teamName, uploadedImage } = this.state;
    const { firstName, lastName, number } = this.state.newPlayerInfo;
    const playerFirebaseName = `${firstName}-${lastName}-${number}`;

    const uploadTask = storage
      .ref(`images/teams/${teamName}/players/${playerFirebaseName}`)
      .put(uploadedImage);
    return uploadTask.on(
      "state_changed",
      snapshot => {
        const imageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ imageUploadProgress });
      },
      error => {},
      () => {
        storage
          .ref(`images/teams/${teamName}/players/`)
          .child(playerFirebaseName)
          .getDownloadURL()
          .then(url => {
            this.handlePlayerCreate(url);
          });
      }
    );
  };

  render() {
    const filePreviewElement = this.state.previewFile && (
      <div>
        <img
          src={this.state.previewFile}
          className={classes.PreviewFile}
          alt="preview-img"
        />
        <h2>{this.state.previewFile.fileName}</h2>
      </div>
    );

    let players = null;

    if (this.state.players) {
      const fetchedPlayers = Object.values(this.state.players);
      players = fetchedPlayers.map(player => {
        return (
          <Player
            key={player.playerId}
            number={player.number}
            firstName={player.firstName}
            lastName={player.lastName}
            position={player.position}
            birth={player.birth}
            photo={player.photo}
            playerId={player.playerId}
            teamId={this.props.match.params.teamId}
            teamName={player.teamName}
            onDelete={this.handlePlayerDelete}
          />
        );
      });
    }

    return (
      <>
        <div className={classes.Players}>{players}</div>
        <PlayerCreator
          active={this.state.playerCreatorActive}
          imgUploadProgress={this.state.imageUploadProgress}
          onFormSubmit={this.handleFormSubmit}
          onInputChange={this.handleInputChange}
          onImageSelect={this.handleImageSelect}
          onClose={this.handlePlayerCreatorClose}
          onClick={this.handlePlayerCreatorOpen}
        >
          {filePreviewElement}
        </PlayerCreator>
      </>
    );
  }
}

export default Players;
