import React, { useState } from 'react';
import classes from './TeamCreator.module.css';
import { Input, Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import FilePreviewElement from '../shared/FilePreviewElement/FilePreviewElement';

const placeholderURL = 'https://via.placeholder.com/120/eee/000/?text=Team';

const TeamCreator = ({ onSubmit }) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(placeholderURL);
  const [teamCreatorActive, setTeamCreatorActive] = useState(false);

  const handleTeamCreatorClose = () => {
    setTeamCreatorActive(false);
    setNewTeamName('');
    if (selectedImage) setSelectedImage(null);
    setPreviewFileUrl(placeholderURL);
  };

  const handleTeamNameChange = ({ target: { value } }) => {
    setNewTeamName(value);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewFileUrl(previewURL);
  };

  const submitBtnDisabled = () => {
    return newTeamName ? false : true;
  };

  const teamCreator = teamCreatorActive ? (
    <form className={classes.TeamCreator}>
      <div className={classes.TeamCreator__FileUploadSection}>
        <div className={classes.TeamCreator__PreviewFile}>
          <FilePreviewElement src={previewFileUrl} />
        </div>
        <input type="file" id="teamLogo" onChange={handleImageSelect} />
        <label
          htmlFor="teamLogo"
          name="teamLogo"
          className={classes.TeamCreator__PrevFileHelperText}
        >
          Choose file..
        </label>
      </div>
      <div className={classes.TeamCreator__MidColumnWraper}>
        <StylesProvider injectFirst>
          <Input
            type="text"
            name="teamName"
            className={classes.TeamCreator__Input}
            placeholder="Team Name"
            autoFocus
            onChange={handleTeamNameChange}
            color="primary"
            required
            inputProps={{
              maxLength: 18,
            }}
          />
          <div className={classes.TeamCreator__Buttons}>
            <Button
              type="submit"
              className={classes.TeamCreator__Button_Update}
              onClick={(event) => {
                onSubmit(newTeamName, selectedImage, event);
                handleTeamCreatorClose();
              }}
              disabled={submitBtnDisabled()}
              variant="contained"
              color="primary"
            >
              add
            </Button>
            <Button
              className={classes.TeamCreator__Button_Cancel}
              onClick={handleTeamCreatorClose}
              variant="contained"
              color="secondary"
            >
              cancel
            </Button>
          </div>
        </StylesProvider>
      </div>
    </form>
  ) : (
    <div
      className={classes.TeamCreator_Inactive}
      onClick={() => setTeamCreatorActive(true)}
    >
      <i className={`fas fa-users ${classes.TeamCreator_Inactive__UsersIcon}`}>
        <i
          className={`fas fa-plus ${classes.TeamCreator_Inactive__UsersIcon_Plus}`}
        ></i>
      </i>
      <span>add team</span>
    </div>
  );

  return <>{teamCreator}</>;
};

export default TeamCreator;
