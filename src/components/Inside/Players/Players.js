import React, { Component } from "react";
import Player from "./Player/Player";
import axios from "axios";
import { storage } from "../../../firebase/firebase";
// import Spinner from "../UI/Spinner/Spinner";
import classes from "./Players.module.css";
import PlayerCreator from "./PlayerCreator/PlayerCreator";

class Players extends Component {
  state = {
    players: null,
    teamName: this.props.location.teamName,
    addNewPlayerClicked: false,
    submitDisabled: true,
    newPlayerInfo: {
      number: "",
      firstName: "",
      lastName: "",
      position: "",
      birth: "",
      photo: null
    },
    previewFile: null,
    uploadedImage: null
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
          this.setState({ players: data.players, teamName: data.teamName });
        }
      });
  }

  newPlayerClickedHandler = () => {
    if (!this.state.addNewPlayerClicked) {
      this.setState({ addNewPlayerClicked: true });
    }
  };

  createCancelledHandler = () => {
    this.setState({ addNewPlayerClicked: false });
  };

  changeHandler = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newPlayerInfo: {
        ...this.state.newPlayerInfo,
        [id]: value
      }
    });
  };

  createPlayerHandler = uploadedImageUrl => {
    console.log(uploadedImageUrl);
    const newPlayer = { ...this.state.newPlayerInfo, photo: uploadedImageUrl };
    console.log(newPlayer);
    this.sendData(newPlayer);
    this.componentDidMount();
  };

  sendData = async newPlayer => {
    console.log(this.props.location.teamId);

    await axios.post(
      `https://team-manager-b8e8c.firebaseio.com/${this.props.match.params.teamId}/players.json`,
      newPlayer
    );
  };

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  handleFileSelect = e => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      uploadedImage: file
    });
  };

  fileUploadHandler = event => {
    event.preventDefault();
    const { teamName, uploadedImage } = this.state;
    const { firstName, lastName, number } = this.state.newPlayerInfo;
    const playerFirebaseName = `${firstName}-${lastName}-${number}`;

    const uploadTask = storage
      .ref(`images/teams/${teamName}/players/${playerFirebaseName}`)
      .put(uploadedImage);
    return uploadTask.on(
      "state_changed",
      snapshot => {
        // console.log(snapshot);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {},
      () => {
        storage
          .ref(`images/teams/${teamName}/players/`)
          .child(playerFirebaseName)
          .getDownloadURL()
          .then(url => {
            this.createPlayerHandler(url);
          });
      }
    );
  };

  // createTeamHandler = uploadedImageUrl => {
  //   const newTeam = {
  //     teamName: this.state.newTeamName,
  //     players: [],
  //     teamLogo: uploadedImageUrl
  //   };
  //   this.sendData(newTeam);
  // };

  // sendData = async newTeam => {
  //   await axios.post(
  //     "https://team-manager-b8e8c.firebaseio.com/.json",
  //     newTeam
  //   );
  //   this.componentDidMount();
  // };

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
      players = fetchedPlayers.map((player, index) => {
        return (
          <Player
            key={index}
            playerId={index}
            number={player.number}
            firstName={player.firstName}
            lastName={player.lastName}
            position={player.position}
            birth={player.birth}
            teamId={this.props.match.params.teamId}
            photo={player.photo}
            // teamName={this.state.teamName}
          />
        );
      });
    }

    return (
      <>
        <div className={classes.Players}>{players}</div>
        <PlayerCreator
          active={this.state.addNewPlayerClicked}
          clicked={this.newPlayerClickedHandler}
          change={this.changeHandler}
          cancelled={this.createCancelledHandler}
          addImg={this.handleFileSelect}
          createPlayer={this.fileUploadHandler}
          progress={this.state.progress}
        >
          {filePreviewElement}
        </PlayerCreator>
      </>
    );
  }
}

export default Players;
