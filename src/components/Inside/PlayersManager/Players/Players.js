import React, { Component } from "react";
import classes from "./Players.module.css";
import axios from "axios";
import { storage, database } from "../../../../firebase/firebase";
import PlayerCreator from "./PlayerCreator/PlayerCreator";
import Player from "./Player/Player";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Info from "@material-ui/icons/Info";
import StylesProvider from "@material-ui/styles/StylesProvider";

class Players extends Component {
  state = {
    teamName: "",
    players: [],
    playersCheckboxes: [],
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
    const { teamId } = this.props;

    axios
      .get(`https://team-manager-b8e8c.firebaseio.com/${teamId}.json`)
      .then((res) => {
        const { teamName, players } = res.data;
        if (players) {
          const playersArr = Object.values(players);
          const playersCheckboxes = playersArr.map((player) => ({
            checked: false,
            id: player.playerId,
            photo: player.playerPhoto,
          }));
          this.setState({ teamName, players: playersArr, playersCheckboxes });
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

  handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = this.state.playersCheckboxes;
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });
    // this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ playersCheckboxes: updatedCheckboxes });
  };

  handleCheckboxClick = ({ target }, index, id, photo) => {
    const updatedCheckboxes = [...this.state.playersCheckboxes];
    const clickedCheckbox = { checked: target.checked, id, photo };
    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    // this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ playersCheckboxes: updatedCheckboxes });
  };

  handleCheckedPlayersDelete = () => {
    const checkedPlayers = this.state.playersCheckboxes.filter(
      (item) => item.checked
    );
    checkedPlayers.forEach((player) => {
      console.log(player);

      this.handlePlayerDelete(player.id, player.photo);
    });
  };

  handlePlayerDelete = (playerId, photo) => {
    const { teamId } = this.props;
    database.ref(`${teamId}/players/${playerId}`).remove();
    if (photo) {
      storage.ref(`images/teams/${teamId}/players/${playerId}`).delete();
    }
    // this.updatePlayersArrayOnPlayerDelete(playerId);
  };

  updatePlayersArrayOnPlayerDelete = (playerId) => {
    const currentPlayersArr = [...this.state.players];
    const updatedPlayersArr = currentPlayersArr.filter(
      (player) => player.playerId !== playerId
    );
    this.setState({ players: updatedPlayersArr });
  };

  handleImageUpload = async (playerId, selectedImage) => {
    const { teamId } = this.props;
    await storage
      .ref(`images/teams/${teamId}/players/${playerId}`)
      .put(selectedImage);
  };

  getUploadedImageUrl = async (playerId) => {
    const { teamId } = this.props;
    await storage
      .ref(`images/teams/${teamId}/players/${playerId}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ uploadedImageUrl: url });
      });
  };

  assignUploadedImageUrl = (playerId) => {
    const { teamId } = this.props;
    database
      .ref(`/${teamId}/players/${playerId}/`)
      .update({ playerPhoto: this.state.uploadedImageUrl });
  };

  updatePlayersArrayOnPlayerAdd = (newPlayer, playerPhoto) => {
    const { players, playersCheckboxes } = this.state;

    const playerPhotoUrl = playerPhoto
      ? URL.createObjectURL(playerPhoto)
      : null;

    const updatedPlayersArray = players
      ? [...players, { ...newPlayer, playerPhoto: playerPhotoUrl }]
      : [players, { ...newPlayer, playerPhoto: playerPhotoUrl }];
    const updatedCheckboxesArray = players
      ? [
          ...playersCheckboxes,
          { checked: false, id: newPlayer.playerId, photo: playerPhotoUrl },
        ]
      : [
          playersCheckboxes,
          { checked: false, id: newPlayer.playerId, photo: playerPhotoUrl },
        ];
    this.setState({
      players: updatedPlayersArray,
      playersCheckboxes: updatedCheckboxesArray,
    });
  };

  handleFormSubmitNewPlayer = (playerInfo, playerPhoto, e) => {
    e.preventDefault();
    const { teamId } = this.props;
    const databaseRef = database.ref(`${teamId}/players`);
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

  handleFormSubmitEditPlayer = (playerId, playerInfo, playerPhoto) => {
    const { teamId } = this.props;
    database.ref(`${teamId}/players/${playerId}/playerInfo`).set(playerInfo);
    if (playerPhoto) {
      this.handleImageUpload(playerId, playerPhoto).then(() => {
        this.getUploadedImageUrl(playerId).then(() => {
          this.assignUploadedImageUrl(playerId);
        });
      });
    }
    this.updatePlayersArrayOnPlayerUpdate(playerId, playerInfo, playerPhoto);
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

  handlePlayersSort = (e, attribute) => {
    const sortedPlayers = [...this.state.players].sort((a, b) =>
      a.playerInfo[attribute] > b.playerInfo[attribute] ? 1 : -1
    );

    if (e.ctrlKey) {
      sortedPlayers.reverse();
    }

    this.setState({
      players: sortedPlayers,
    });
  };

  render() {
    const teamPlayers = this.state.players && (
      <div className={classes.PlayersList}>
        <div className={classes.ListItem}>
          <span className={classes.ListItem__Player}>player</span>
          <span
            className={`${classes.ListItem__Number} ${classes.ListItem__Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "number")}
          >
            nr
          </span>
          <span
            className={`${classes.ListItem__FirstName} ${classes.ListItem__Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "firstName")}
          >
            first name
          </span>
          <span
            className={`${classes.ListItem__LastName} ${classes.ListItem__Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "lastName")}
          >
            last name
          </span>
          <span
            className={`${classes.ListItem__Position} ${classes.ListItem__Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "position")}
          >
            position
          </span>
          <span
            className={`${classes.ListItem__Birthday} ${classes.ListItem__Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "birth")}
          >
            birthday
          </span>
          <span className={classes.ListItem__Actions}>actions</span>
          <Tooltip
            className={classes.ListItem__Info}
            title="Ctrl + click to sort in opposite order"
            placement="top"
          >
            <Info />
          </Tooltip>
        </div>
        {this.state.players.map((player, index) => {
          return (
            <Player
              key={player.playerId}
              teamId={this.props.teamId}
              playerId={player.playerId}
              playerInfo={player.playerInfo}
              playerPhoto={player.playerPhoto}
              onDelete={this.handlePlayerDelete}
              onSubmit={this.handleFormSubmitEditPlayer}
              checkbox={
                <Checkbox
                  checked={this.state.playersCheckboxes[index].checked}
                  onChange={(event) =>
                    this.handleCheckboxClick(
                      event,
                      index,
                      player.playerId,
                      player.playerPhoto
                    )
                  }
                />
              }
            />
          );
        })}
        <div className={classes.PlayersList__ActionPanel}>
          <StylesProvider injectFirst>
            <Button
              className={classes.Button__Delete}
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.handleCheckedPlayersDelete}
            >
              delete
            </Button>
            <div className={classes.ActionPanel__Checkbox}>
              <Checkbox onChange={this.handleCheckboxSelectAll} />
            </div>
          </StylesProvider>
        </div>
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
