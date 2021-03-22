import React, { useState } from 'react';
import classes from './Player.module.css';
import FilePreviewElement from '../../shared/FilePreviewElement/FilePreviewElement';
import { StylesProvider } from '@material-ui/core/styles';
import defaultImage from '../../assets/img/user.jpg';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const placeholderURL = 'https://via.placeholder.com/45/eee?text=+';

const Player = ({
  playerId,
  playerPhoto,
  playerInfo,
  onSubmit,
  onDelete,
  checkbox,
}) => {
  const [editFormActive, setEditFormActive] = useState(false);
  const [updatedPlayerInfo, setUpdatedPlayerInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(placeholderURL);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditFormOpen = () => {
    if (!editFormActive) {
      setEditFormActive(true);
      setUpdatedPlayerInfo(playerInfo);
    }
  };

  const handleEditFormClose = () => {
    setEditFormActive(false);
    setSelectedImage(null);
    setUpdatedPlayerInfo({ ...playerInfo });
    setPreviewFileUrl(placeholderURL);
  };

  const handleInputChange = ({ target }) => {
    const { id, value, name } = target;
    if (id !== 'photo') {
      setUpdatedPlayerInfo((prevPlayerInfo) => ({
        ...prevPlayerInfo,
        [id || name]: value,
      }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setPreviewFileUrl(previewURL);
    setSelectedImage(file);
  };

  const handleClearInput = ({ target }) => {
    target.placeholder = '';
  };

  const player = editFormActive ? (
    <StylesProvider injectFirst>
      <form
        className={classes.Player_Editable}
        autoComplete="off"
        onChange={(event) => handleInputChange(event)}
      >
        <div className={classes.Player_Editable__FileUploadSection}>
          <div className={classes.Player_Editable__PreviewFile}>
            <FilePreviewElement src={previewFileUrl} />
            <label
              htmlFor="photo"
              className={
                previewFileUrl !== placeholderURL
                  ? classes.Player_Editable__PrevFileHelperText_Hide
                  : classes.Player_Editable__PrevFileHelperText
              }
            >
              <i className={`fas fa-plus`}></i>
            </label>
          </div>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleImageSelect}
          />
        </div>
        <div
          className={`${classes.Player_Editable__InputWraper} ${classes.Player_Editable_Number} `}
        >
          <input
            type="text"
            id="number"
            maxLength={2}
            name="number"
            className={`${classes.Player_Editable__InputText} ${classes.Player_Editable__InputText_Number}`}
            placeholder={playerInfo.number}
            onFocus={(event) => handleClearInput(event)}
          />
        </div>
        <div
          className={`${classes.Player_Editable__InputWraper} ${classes.Player_Editable_FirstName} `}
        >
          <input
            type="text"
            id="firstName"
            maxLength={12}
            name="firstName"
            className={classes.Player_Editable__InputText}
            placeholder={playerInfo.firstName}
            onFocus={(event) => handleClearInput(event)}
          />
        </div>
        <div
          className={`${classes.Player_Editable__InputWraper} ${classes.Player_Editable_LastName} `}
        >
          <input
            type="text"
            id="lastName"
            maxLength={14}
            name="lastName"
            className={classes.Player_Editable__InputText}
            placeholder={playerInfo.lastName}
            onFocus={(event) => handleClearInput(event)}
          />
        </div>
        <div className={classes.Player_Editable__InputWraper}>
          <select
            id="position"
            name="position"
            defaultValue={playerInfo.position}
            className={classes.Player_Editable__SelectField}
          >
            <option
              className={classes.Player_Editable__SelectOption}
              value="goalkeeper"
            >
              Goalkeeper
            </option>
            <option
              className={classes.Player_Editable__SelectOption}
              value="defender"
            >
              Defender
            </option>
            <option
              className={classes.Player_Editable__SelectOption}
              value="midfielder"
            >
              Midfielder
            </option>
            <option
              className={classes.Player_Editable__SelectOption}
              value="forward"
            >
              Forward
            </option>
          </select>
        </div>
        <div
          className={`${classes.Player_Editable__InputWraper} ${classes.Player_Editable_Birthday} `}
        >
          <input
            type="date"
            id="birth"
            name="birth"
            className={classes.Player_Editable__DateInput}
            defaultValue={playerInfo.birth}
          />
        </div>
        <div className={classes.Player_Editable__ButtonsWraper}>
          <div className={classes.Player_Editable__Buttons}>
            <Tooltip title="Save" placement="bottom">
              <i
                className={`fas fa-check ${classes.Player_Editable__Button} ${classes.Player_Editable__Button_Save}`}
                variant="contained"
                color="primary"
                onClick={() => {
                  onSubmit(playerId, updatedPlayerInfo, selectedImage);
                  handleEditFormClose();
                }}
              ></i>
            </Tooltip>
            <Tooltip title="Cancel" placement="bottom">
              <i
                className={`fas fa-times ${classes.Player_Editable__Button} ${classes.Player_Editable__Button_Cancel}`}
                variant="contained"
                color="secondary"
                onClick={handleEditFormClose}
              ></i>
            </Tooltip>
          </div>
        </div>
      </form>
    </StylesProvider>
  ) : (
    <StylesProvider injectFirst>
      <div className={classes.Player}>
        <div className={classes.Player__AvatarWraper}>
          <Avatar
            alt={`Player Avatar`}
            src={playerPhoto || defaultImage}
            className={classes.Player__Avatar}
            variant="rounded"
          />
        </div>
        <div
          className={`${classes.Player__Info} ${classes.Player__Info_Number}`}
        >
          <span>{playerInfo.number}</span>
        </div>
        <div
          className={`${classes.Player__Info} ${classes.Player__Info_FirstName}`}
        >
          <span>{playerInfo.firstName}</span>
        </div>
        <div
          className={`${classes.Player__Info} ${classes.Player__Info_LastName}`}
        >
          <span>{playerInfo.lastName}</span>
        </div>
        <div
          className={`${classes.Player__Info} ${classes.Player__Info_Position}`}
        >
          <span>{playerInfo.position}</span>
        </div>
        <div
          className={`${classes.Player__Info} ${classes.Player__Info_Birthday}`}
        >
          <span>{playerInfo.birth}</span>
        </div>
        <div className={`${classes.Player__Icons}`}>
          <Tooltip title="Edit" placement="bottom">
            <i
              className={`fas fa-edit ${classes.Player__Icon_Edit}`}
              onClick={handleEditFormOpen}
            ></i>
          </Tooltip>
          <Tooltip title="Delete" placement="bottom">
            <i
              className={`fa fa-trash ${classes.Player__Icon_Trash}`}
              onClick={() => setDeleteModalOpen(true)}
            ></i>
          </Tooltip>
          <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <Card className={classes.Player__Modal}>
              <span className={classes.Player__ModalMsg}>
                Are you sure you want to delete this player?
              </span>
              <div className={classes.Player__ModalButtons}>
                <button
                  className={`${classes.Player__ModalButton} ${classes.Player__ModalButton_Yes}`}
                  onClick={() => {
                    onDelete(playerId, playerPhoto);
                    setDeleteModalOpen(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className={`${classes.Player__ModalButton} ${classes.Player__ModalButton_No}`}
                  onClick={() => setDeleteModalOpen(false)}
                >
                  No
                </button>
              </div>
            </Card>
          </Modal>
        </div>
        <div className={classes.Player__CheckboxWraper}>{checkbox}</div>
      </div>
    </StylesProvider>
  );

  return <>{player}</>;
};
export default Player;
