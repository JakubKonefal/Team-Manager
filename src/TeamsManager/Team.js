import React, { useState } from 'react';
import classes from './Team.module.css';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip, Input, Button, Modal, Card } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import defaultTeamLogo from '../assets/img/default_team_logo.png';
import FilePreviewElement from '../shared/FilePreviewElement/FilePreviewElement';

const placeholderURL = 'https://via.placeholder.com/120/eee/000/?text=Team';

const Team = ({ teamId, teamName, teamLogo, onSubmit, onDelete }) => {
  const [editFormActive, setEditFormActive] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(placeholderURL);

  const handleTeamNameChange = ({ target: value }) => {
    setNewTeamName(value);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewFileUrl(previewURL);
  };

  const handleEditFormClose = () => {
    setEditFormActive(false);
    setNewTeamName('');
    if (selectedImage) {
      setSelectedImage(null);
      setPreviewFileUrl(placeholderURL);
    }
  };

  const team = editFormActive ? (
    <li>
      <form className={classes.Team_Editable}>
        <div className={classes.Team_Editable__FileUploadSection}>
          <div className={classes.Team_Editable__PreviewFile}>
            <FilePreviewElement src={previewFileUrl} />
          </div>
          <input
            type="file"
            id="teamLogo"
            name="teamLogo"
            onChange={handleImageSelect}
          />
          <label
            htmlFor="teamLogo"
            className={classes.Team_Editable__PrevFileHelperText}
          >
            Choose file..
          </label>
        </div>
        <div className={classes.Team_Editable__MidColumnWraper}>
          <StylesProvider injectFirst>
            <Input
              type="text"
              name="teamName"
              className={classes.Team_Editable__Input}
              placeholder={teamName}
              autoFocus
              inputProps={{
                maxLength: 18,
              }}
              onChange={handleTeamNameChange}
              color="default"
            />
            <div className={classes.Team_Editable__Buttons}>
              <Button
                type="submit"
                className={classes.Team_Editable__Button_Save}
                onClick={(event) => {
                  onSubmit(teamId, newTeamName, selectedImage, event);
                  handleEditFormClose();
                }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className={classes.Team_Editable__Button_Cancel}
                onClick={handleEditFormClose}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </StylesProvider>
        </div>
      </form>
    </li>
  ) : (
    <li className={classes.Team}>
      <StylesProvider injectFirst>
        <Avatar
          className={classes.Team__Avatar}
          src={teamLogo || defaultTeamLogo}
          alt="team-logo"
          variant="square"
        />
      </StylesProvider>
      <Link
        className={classes.Team__TeamName}
        to={{
          pathname: `/my-teams/${teamId}/${teamName}`,
        }}
      >
        {teamName}
      </Link>
      <div className={classes.Team__Icons}>
        <Tooltip title="Delete" placement="bottom">
          <i
            className={`fa fa-trash ${classes.Team__Icon} ${classes.Team__Icon_Trash} `}
            onClick={() => setDeleteModalOpen(true)}
          ></i>
        </Tooltip>
        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <Card className={classes.Team__Modal}>
            <span className={classes.Team__ModalMsg}>
              Are you sure you want to delete this team?
            </span>
            <div className={classes.Team__ModalButtons}>
              <button
                className={`${classes.Team__ModalButton} ${classes.Team__ModalButton_Yes}`}
                onClick={() => {
                  onDelete(teamId, teamLogo);
                  setDeleteModalOpen(false);
                }}
              >
                Yes
              </button>
              <button
                className={`${classes.Team__ModalButton} ${classes.Team__ModalButton_No}`}
                onClick={() => setDeleteModalOpen(false)}
              >
                No
              </button>
            </div>
          </Card>
        </Modal>
        <Tooltip title="Edit" placement="bottom">
          <i
            className={`fas fa-edit ${classes.Team__Icon} ${classes.Team__Icon_Edit}`}
            onClick={() => setEditFormActive(true)}
          ></i>
        </Tooltip>
      </div>
    </li>
  );

  return <>{team}</>;
};

export default Team;
