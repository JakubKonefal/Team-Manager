import React, { Component } from "react";
import axios from "axios";
import { storage, database } from "../../../firebase/firebase";
import PlayerCreator from "./PlayerCreator/PlayerCreator";
import FilePreviewElement from "../../UI/FilePreviewElement/FilePreviewElement";
import PlayersList from "./PlayersList/PlayersList";

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

  handleNewPlayerFormSubmit = e => {
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
    return (
      <>
        <PlayersList
          players={this.state.players}
          teamId={this.props.match.params.teamId}
          onDelete={this.handlePlayerDelete}
        />
        <PlayerCreator
          active={this.state.playerCreatorActive}
          imgUploadProgress={this.state.imageUploadProgress}
          onFormSubmit={this.handleNewPlayerFormSubmit}
          onInputChange={this.handleInputChange}
          onImageSelect={this.handleImageSelect}
          onClose={this.handlePlayerCreatorClose}
          onClick={this.handlePlayerCreatorOpen}
        >
          <FilePreviewElement src={this.state.previewFile} />
        </PlayerCreator>
      </>
    );
  }
}

export default Players;
