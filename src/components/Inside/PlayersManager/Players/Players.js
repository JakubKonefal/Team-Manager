import React, { Component } from "react";
import classes from "./Players.module.css";
import axios from "axios";
import { storage, database } from "../../../../firebase/firebase";
import PlayerCreator from "./PlayerCreator/PlayerCreator";
import Player from "./Player/Player";

class Players extends Component {
  state = {
    teamName: "",
    players: [],
    playerCreatorActive: false,
    newPlayerInfo: {
      number: "",
      firstName: "",
      lastName: "",
      position: "",
      birth: "",
      photo: null,
    },
    previewFile: null,
    uploadedImage: null,
    uploadedImageUrl: "",
  };

  componentDidMount() {
    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/${this.props.teamId}.json`
      )
      .then((res) => {
        const { teamName, players } = res.data;
        if (players) {
          const playersArr = Object.values(players);
          this.setState({ teamName, players: playersArr });
        }
      });
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newPlayerInfo: {
        ...this.state.newPlayerInfo,
        [id]: value,
      },
    });
  };

  handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      uploadedImage: file,
    });
  };

  handlePlayerDelete = (playerId, photo) => {
    database.ref(`${this.props.teamId}/players/${playerId}`).remove();
    if (photo) {
      storage
        .ref(`images/teams/${this.props.teamId}/players/${playerId}`)
        .delete();
    }
    this.updatePlayersArrayOnPlayerDelete(playerId);
  };

  updatePlayersArrayOnPlayerDelete = (playerId) => {
    const currentPlayersArr = [...this.state.players];
    const updatedPlayersArr = currentPlayersArr.filter(
      (player) => player.playerId !== playerId
    );
    this.setState({ players: updatedPlayersArr });
  };

  handleImageUpload = async (playerId, selectedImage) => {
    await storage
      .ref(`images/teams/${this.props.teamId}/players/${playerId}`)
      .put(selectedImage);
  };

  getUploadedImageUrl = async (playerId) => {
    await storage
      .ref(`images/teams/${this.props.teamId}/players/${playerId}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ uploadedImageUrl: url });
      });
  };

  assignUploadedImageUrl = (playerId) => {
    database
      .ref(`/${this.props.teamId}/players/${playerId}/`)
      .update({ playerPhoto: this.state.uploadedImageUrl });
  };

  updatePlayersArrayOnPlayerAdd = (newPlayer, playerPhoto) => {
    const { players } = this.state;

    const playerPhotoUrl = playerPhoto
      ? URL.createObjectURL(playerPhoto)
      : null;

    const updatedPlayersArray = players
      ? [...players, { ...newPlayer, playerPhoto: playerPhotoUrl }]
      : [players, { ...newPlayer, playerPhoto: playerPhotoUrl }];
    this.setState({ players: updatedPlayersArray });
  };

  handleFormSubmitNewPlayer = (playerInfo, playerPhoto, e) => {
    e.preventDefault();
    const databaseRef = database.ref(`${this.props.teamId}/players`);
    const playerId = databaseRef.push().key;
    const newPlayer = {
      playerId,
      playerInfo: { ...playerInfo },
    };
    databaseRef.child(playerId).set(newPlayer);

    if (playerPhoto) {
      this.handleImageUpload(playerId, playerPhoto).then(() => {
        this.getUploadedImageUrl(playerId).then(() => {
          this.assignUploadedImageUrl(playerId);
        });
      });
    }
    this.updatePlayersArrayOnPlayerAdd(newPlayer, playerPhoto);
  };

  updatePlayersArrayOnPlayerUpdate = (playerId, playerInfo, playerPhoto) => {
    const updatedPlayersArray = [...this.state.players];
    const updatedPlayerIndex = this.state.players.findIndex((player) => {
      return player.playerId === playerId;
    });

    const playerPhotoUrl = playerPhoto
      ? URL.createObjectURL(playerPhoto)
      : updatedPlayersArray[updatedPlayerIndex].playerPhoto;

    const updatedPlayer = {
      playerId,
      playerPhoto: playerPhotoUrl,
      playerInfo,
    };

    updatedPlayersArray.splice(updatedPlayerIndex, 1, updatedPlayer);

    this.setState({ players: updatedPlayersArray });
  };

  handleFormSubmitEditPlayer = (playerId, playerInfo, playerPhoto) => {
    database
      .ref(`${this.props.teamId}/players/${playerId}/playerInfo`)
      .set(playerInfo);
    if (playerPhoto) {
      this.handleImageUpload(playerId, playerPhoto).then(() => {
        this.getUploadedImageUrl(playerId).then(() => {
          this.assignUploadedImageUrl(playerId);
        });
      });
    }
    this.updatePlayersArrayOnPlayerUpdate(playerId, playerInfo, playerPhoto);
  };

  render() {
    const teamPlayers = this.state.players && (
      <div className={classes.PlayersList}>
        <div className={classes.ListItem}>
          <span className={classes.ListItem__Player}>player</span>
          <span className={classes.ListItem__Number}>nr</span>
          <span className={classes.ListItem__FirstName}>first name</span>
          <span className={classes.ListItem__LastName}>last name</span>
          <span className={classes.ListItem__Position}>position</span>
          <span className={classes.ListItem__Birthday}>birthday</span>
          <span className={classes.ListItem__Actions}>actions</span>
        </div>
        {this.state.players.map((player) => {
          return (
            <Player
              key={player.playerId}
              teamId={this.props.teamId}
              playerId={player.playerId}
              playerInfo={player.playerInfo}
              playerPhoto={player.playerPhoto}
              onDelete={this.handlePlayerDelete}
              onSubmit={this.handleFormSubmitEditPlayer}
            />
          );
        })}
      </div>
    );

    return (
      <>
        {teamPlayers}
        <PlayerCreator
          onSubmit={this.handleFormSubmitNewPlayer}
        ></PlayerCreator>
      </>
    );
  }
}

export default Players;
