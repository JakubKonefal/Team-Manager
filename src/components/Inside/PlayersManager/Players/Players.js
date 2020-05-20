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
    players: [],
    playersCheckboxes: [],
    checkedTrainingsCount: 0,
    previewFile: null,
    uploadedImage: null,
    uploadedImageUrl: "",
  };

  componentDidMount() {
    const { teamId, userId } = this.props;

    axios
      .get(
        `https://team-manager-b8e8c.firebaseio.com/users/${userId}/teams/${teamId}/players.json`
      )
      .then((res) => {
        const players = res.data;
        if (players) {
          const playersArray = Object.values(players);
          const playersSortedByNumber = playersArray.sort((a, b) => {
            return a.playerInfo.number - b.playerInfo.number;
          });
          playersSortedByNumber.reverse();

          const playersCheckboxes = playersSortedByNumber.map((player) => ({
            checked: false,
            id: player.playerId,
            photo: player.playerPhoto,
          }));
          this.setState({
            players: playersSortedByNumber,
            playersCheckboxes,
          });
        }
      });
  }

  countCheckedTrainings = (checkboxes) => {
    const checkedTrainingsCount = checkboxes.filter((item) => item.checked)
      .length;
    this.setState({ checkedTrainingsCount });
  };

  handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = this.state.playersCheckboxes;
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });
    this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ playersCheckboxes: updatedCheckboxes });
  };

  handleCheckboxClick = ({ target }, index, id, photo) => {
    const updatedCheckboxes = [...this.state.playersCheckboxes];
    const clickedCheckbox = { checked: target.checked, id, photo };
    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ playersCheckboxes: updatedCheckboxes });
  };

  handleCheckedPlayersDelete = () => {
    const { teamId, userId } = this.props;
    const checkedPlayers = this.state.playersCheckboxes.filter(
      (item) => item.checked
    );
    checkedPlayers.forEach((player) => {
      database
        .ref(`/users/${userId}/teams/${teamId}/players/${player.id}`)
        .remove();
      if (player.photo) {
        storage
          .ref(`/users/${userId}/images/teams/${teamId}/players/${player.id}`)
          .delete();
      }
    });
    this.updatePlayersOnDelete();
  };

  handlePlayerDelete = (playerId, photo) => {
    const { teamId, userId } = this.props;
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}`)
      .remove();
    if (photo) {
      storage
        .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
        .delete();
    }
    this.updatePlayersOnDelete();
  };

  updatePlayersOnDelete = () => {
    const { teamId, userId } = this.props;
    const playersDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/players`
    );
    playersDatabaseRef.once("value", (snapshot) => {
      const snapshotValue = snapshot.val();

      const players = snapshotValue ? Object.values(snapshotValue) : [];
      this.setState({ players });
    });
  };

  handleImageUpload = async (playerId, selectedImage) => {
    const { teamId, userId } = this.props;
    await storage
      .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
      .put(selectedImage);
  };

  getUploadedImageUrl = async (playerId) => {
    const { teamId, userId } = this.props;
    await storage
      .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ uploadedImageUrl: url });
      });
  };

  assignUploadedImageUrl = (playerId) => {
    const { teamId, userId } = this.props;
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}`)
      .update({ playerPhoto: this.state.uploadedImageUrl });
  };

  updatePlayersOnAdd = (newPlayer, playerPhoto) => {
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
    const { teamId, userId } = this.props;
    const databaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/players`
    );
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
    this.updatePlayersOnAdd(newPlayer, playerPhoto);
  };

  handleFormSubmitEditPlayer = (playerId, playerInfo, playerPhoto) => {
    const { teamId, userId } = this.props;
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}/playerInfo`)
      .set(playerInfo);
    if (playerPhoto) {
      this.handleImageUpload(playerId, playerPhoto).then(() => {
        this.getUploadedImageUrl(playerId).then(() => {
          this.assignUploadedImageUrl(playerId);
        });
      });
    }
    this.updatePlayersOnEdit(playerId, playerInfo, playerPhoto);
  };

  updatePlayersOnEdit = (playerId, playerInfo, playerPhoto) => {
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
    const sortedPlayers = [...this.state.players].sort((a, b) => {
      if (attribute === "number") {
        return a.playerInfo[attribute] - b.playerInfo[attribute];
      }
      return a.playerInfo[attribute] > b.playerInfo[attribute] ? 1 : -1;
    });

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
        <div className={classes.PlayersList__InfoBar}>
          <span className={classes.PlayersList__InfoTile_Player}>player</span>
          <span
            className={`${classes.PlayersList__InfoTile_Number} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "number")}
          >
            nr
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_FirstName} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "firstName")}
          >
            first name
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_LastName} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "lastName")}
          >
            last name
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_Position} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "position")}
          >
            position
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_Birthday} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => this.handlePlayersSort(event, "birth")}
          >
            birthday
          </span>
          <span className={classes.PlayersList__InfoTile_Actions}>actions</span>
          <Tooltip
            className={classes.PlayersList__InfoIcon}
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
              className={classes.PlayersList__Button_Delete}
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.handleCheckedPlayersDelete}
              disabled={this.state.checkedTrainingsCount < 1}
            >
              delete
            </Button>
            <div className={classes.PlayersList__Checkbox}>
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
