import React, { useState, useEffect } from 'react';
import classes from './Players.module.css';
import axios from 'axios';
import { storage, database } from '../../firebase/firebase';
import PlayerCreator from './PlayerCreator';
import Player from './Player';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import StylesProvider from '@material-ui/styles/StylesProvider';

const Players = ({ userId, teamId }) => {
  const [players, setPlayers] = useState([]);
  const [playersCheckboxes, setPlayersCheckboxes] = useState([]);
  const [pending, setPending] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [checkedTrainingsCount, setCheckedTrainingsCount] = useState(0);

  const getInitialPlayersList = () => {
    axios
      .get(`/users/${userId}/teams/${teamId}/players.json`)
      .then(({ data: players }) => {
        if (players) {
          const playersArray = Object.values(players);
          const playersByNumber = playersArray.sort((a, b) => {
            return a.playerInfo.number - b.playerInfo.number;
          });

          const playersCheckboxesList = playersByNumber.map((player) => ({
            checked: false,
            id: player.playerId,
            photo: player.playerPhoto,
          }));
          setPlayers(playersByNumber);
          setPlayersCheckboxes(playersCheckboxesList);
        }
        setPending(false);
      });
  };

  const countCheckedTrainings = (checkboxes) => {
    const checkedItemsCount = checkboxes.filter((item) => item.checked).length;
    setCheckedTrainingsCount(checkedItemsCount);
  };

  const handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = playersCheckboxes;
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });

    countCheckedTrainings(updatedCheckboxes);
    setPlayersCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxClick = ({ target }, index, id, photo) => {
    const updatedCheckboxes = [...playersCheckboxes];
    const clickedCheckbox = { checked: target.checked, id, photo };
    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    countCheckedTrainings(updatedCheckboxes);
    setPlayersCheckboxes(updatedCheckboxes);
  };

  const updatePlayersOnDelete = () => {
    const playersDatabaseRef = database.ref(
      `/users/${userId}/teams/${teamId}/players`
    );
    playersDatabaseRef.once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      const playersListByNumber = snapshotValue
        ? Object.values(snapshotValue).sort((a, b) => {
            return a.playerInfo.number - b.playerInfo.number;
          })
        : [];
      const updatedCheckboxes = playersListByNumber.map((player) => ({
        checked: false,
        id: player.playerId,
        photo: player.playerPhoto,
      }));
      setPlayers(playersListByNumber);
      setPlayersCheckboxes(updatedCheckboxes);
    });
  };

  const handleCheckedPlayersDelete = () => {
    const checkedPlayers = playersCheckboxes.filter((item) => item.checked);
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
    updatePlayersOnDelete();
  };

  const handlePlayerDelete = (playerId, photo) => {
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}`)
      .remove();
    if (photo) {
      storage
        .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
        .delete();
    }
    updatePlayersOnDelete();
  };

  const handleImageUpload = async (playerId, selectedImage) => {
    await storage
      .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
      .put(selectedImage);
  };

  const getUploadedImageUrl = async (playerId) => {
    const imageURL = await storage
      .ref(`/users/${userId}/images/teams/${teamId}/players/${playerId}`)
      .getDownloadURL()
      .then((url) => {
        return url;
      });

    return imageURL;
  };

  const assignUploadedImageUrl = (playerId, uploadedImageUrl) => {
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}`)
      .update({ playerPhoto: uploadedImageUrl });
  };

  const updatePlayersOnAdd = (newPlayer, playerPhoto) => {
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

    setPlayers(updatedPlayersArray);
    setPlayersCheckboxes(updatedCheckboxesArray);
  };

  const handleFormSubmitNewPlayer = (playerInfo, playerPhoto, e) => {
    e.preventDefault();

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
      handleImageUpload(playerId, playerPhoto).then(() => {
        getUploadedImageUrl(playerId).then((url) => {
          assignUploadedImageUrl(playerId, url);
        });
      });
    }
    updatePlayersOnAdd(newPlayer, playerPhoto);
  };

  const updatePlayersOnEdit = (playerId, playerInfo, playerPhoto) => {
    const updatedPlayersArray = [...players];
    const updatedPlayerIndex = players.findIndex((player) => {
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

    setPlayers(updatedPlayersArray);
  };

  const handleFormSubmitEditPlayer = (playerId, playerInfo, playerPhoto) => {
    database
      .ref(`/users/${userId}/teams/${teamId}/players/${playerId}/playerInfo`)
      .set(playerInfo);
    if (playerPhoto) {
      handleImageUpload(playerId, playerPhoto).then(() => {
        getUploadedImageUrl(playerId).then((url) => {
          assignUploadedImageUrl(playerId, url);
        });
      });
    }
    updatePlayersOnEdit(playerId, playerInfo, playerPhoto);
  };

  const handlePlayersSort = (e, attribute) => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (attribute === 'number') {
        return a.playerInfo[attribute] - b.playerInfo[attribute];
      }
      return a.playerInfo[attribute] > b.playerInfo[attribute] ? 1 : -1;
    });

    if (e.ctrlKey) {
      sortedPlayers.reverse();
    }

    setPlayers(sortedPlayers);
  };

  const handleModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
  };

  useEffect(getInitialPlayersList, []);

  if (pending) {
    return <div className={classes.Players__Loader}></div>;
  }

  const playersList =
    players.length > 0 ? (
      <div className={classes.PlayersList}>
        <div className={classes.PlayersList__InfoBar}>
          <span className={classes.PlayersList__InfoTile_Player}>player</span>
          <span
            className={`${classes.PlayersList__InfoTile_Number} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => handlePlayersSort(event, 'number')}
          >
            nr
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_FirstName} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => handlePlayersSort(event, 'firstName')}
          >
            first name
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_LastName} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => handlePlayersSort(event, 'lastName')}
          >
            last name
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_Position} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => handlePlayersSort(event, 'position')}
          >
            position
          </span>
          <span
            className={`${classes.PlayersList__InfoTile_Birthday} ${classes.PlayersList__InfoTile_Sortable}`}
            onClick={(event) => handlePlayersSort(event, 'birth')}
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
        {players.map((player, index) => {
          return (
            <Player
              key={player.playerId}
              teamId={teamId}
              playerId={player.playerId}
              playerInfo={player.playerInfo}
              playerPhoto={player.playerPhoto}
              onDelete={handlePlayerDelete}
              onSubmit={handleFormSubmitEditPlayer}
              checkbox={
                <Checkbox
                  style={{ color: '#ADB6C4' }}
                  checked={playersCheckboxes[index].checked}
                  onChange={(event) =>
                    handleCheckboxClick(
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
        <PlayerCreator onSubmit={handleFormSubmitNewPlayer}></PlayerCreator>
        <div className={classes.PlayersList__ActionPanel}>
          <StylesProvider injectFirst>
            <Button
              className={classes.PlayersList__Button_Delete}
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleModalOpen}
              disabled={checkedTrainingsCount < 1}
            >
              delete
            </Button>
            <Modal open={deleteModalOpen} onClose={handleModalClose}>
              <Card className={classes.PlayersList__Modal}>
                <span className={classes.PlayersList__ModalMsg}>
                  Are you sure you want to delete
                </span>
                <span className={classes.PlayersList__ModalMsg}>
                  checked players?
                </span>
                <div className={classes.PlayersList__ModalButtons}>
                  <button
                    className={`${classes.PlayersList__ModalButton} ${classes.PlayersList__ModalButton_Yes}`}
                    onClick={() => {
                      handleCheckedPlayersDelete();
                      handleModalClose();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`${classes.PlayersList__ModalButton} ${classes.PlayersList__ModalButton_No}`}
                    onClick={handleModalClose}
                  >
                    No
                  </button>
                </div>
              </Card>
            </Modal>
            <div>
              <Tooltip placement="top" title="Select all">
                <Checkbox
                  onChange={handleCheckboxSelectAll}
                  style={{ color: '#ADB6C4' }}
                />
              </Tooltip>
            </div>
          </StylesProvider>
        </div>
      </div>
    ) : (
      <>
        <span className={classes.Players__NoPlayersMsg}>
          You have not created any players yet!
        </span>
        <PlayerCreator onSubmit={handleFormSubmitNewPlayer}></PlayerCreator>
      </>
    );

  return <>{playersList}</>;
};

export default Players;
