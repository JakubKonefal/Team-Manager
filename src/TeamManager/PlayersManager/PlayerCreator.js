import React, { useState } from 'react';
import classes from './PlayerCreator.module.css';
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import StylesProvider from '@material-ui/styles/StylesProvider';
import FilePreviewElement from '../../shared/FilePreviewElement/FilePreviewElement';

const placeholderURL = 'https://via.placeholder.com/120/eee/000/?text=Player';

const PlayerCreator = ({ onSubmit }) => {
  const [playerCreatorActive, setPlayerCreatorActive] = useState(false);
  const [newPlayerPhoto, setNewPlayerPhoto] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState(placeholderURL);
  const [newPlayerInfo, setNewPlayerInfo] = useState({
    number: '',
    firstName: '',
    lastName: '',
    position: '',
    birth: '',
  });

  const handlePlayerCreatorOpen = () => {
    if (!playerCreatorActive) {
      setPlayerCreatorActive(true);
    }
  };

  const handlePlayerCreatorClose = () => {
    setPlayerCreatorActive(false);
    setPreviewFileUrl(placeholderURL);
    setNewPlayerInfo({
      number: '',
      firstName: '',
      lastName: '',
      position: '',
      birth: '',
    });
  };

  const handleInputChange = ({ target }) => {
    const { id, value, name } = target;
    if (id !== 'photo') {
      setNewPlayerInfo((prevPlayerInfo) => ({
        ...prevPlayerInfo,
        [id || name]: value,
      }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    setNewPlayerPhoto(file);
    setPreviewFileUrl(previewFile);
  };

  const playerCreator = playerCreatorActive ? (
    <StylesProvider injectFirst>
      <div className={classes.PlayerCreator__Header}>
        <h2 className={classes.PlayerCreator__Title}>Create new player</h2>
      </div>
      <form
        className={classes.PlayerCreator}
        onChange={handleInputChange}
        onSubmit={(event) => {
          onSubmit(newPlayerInfo, newPlayerPhoto, event);
          handlePlayerCreatorClose();
        }}
      >
        <div className={classes.PlayerCreator__FileUploadSection}>
          <div className={classes.PlayerCreator__PreviewFile}>
            <FilePreviewElement src={previewFileUrl} />
          </div>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleImageSelect}
          />
          <label
            htmlFor="photo"
            className={classes.PlayerCreator__PrevFileHelperText}
          >
            Choose file..
          </label>
        </div>

        <TextField
          id="number"
          name="number"
          label="Number"
          variant="outlined"
          inputProps={{
            maxLength: 2,
          }}
          size="small"
          className={classes.PlayerCreator__Input}
        />
        <TextField
          id="firstName"
          name="firstName"
          label="First name"
          variant="outlined"
          inputProps={{
            maxLength: 12,
          }}
          size="small"
          className={classes.PlayerCreator__Input}
          required
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last name"
          variant="outlined"
          inputProps={{
            maxLength: 14,
          }}
          size="small"
          className={classes.PlayerCreator__Input}
          required
        />
        <FormControl
          variant="outlined"
          className={classes.PlayerCreator__Input}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Position
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            label="Position"
            size="small"
            onChange={handleInputChange}
            value={newPlayerInfo.position}
            name="position"
          >
            <MenuItem value="goalkeeper">Goalkeeper</MenuItem>
            <MenuItem value="defender">Defender</MenuItem>
            <MenuItem value="midfielder">Midfielder</MenuItem>
            <MenuItem value="forward">Forward</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          id="birth"
          name="birth"
          label="Birthday"
          type="date"
          className={classes.PlayerCreator__Input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.PlayerCreator__Buttons}>
          <Button
            type="submit"
            className={classes.PlayerCreator__Button_Add}
            variant="contained"
            color="primary"
          >
            add
          </Button>
          <Button
            className={classes.PlayerCreator__Button_Cancel}
            variant="contained"
            color="secondary"
            onClick={handlePlayerCreatorClose}
          >
            cancel
          </Button>
        </div>
      </form>
    </StylesProvider>
  ) : (
    <div
      className={classes.PlayerCreator_Inactive}
      onClick={handlePlayerCreatorOpen}
    >
      <i
        className={`fas fa-user-plus ${classes.PlayerCreator_Inactive__AddUserIcon}`}
      ></i>
      <span>add player</span>
    </div>
  );

  return <>{playerCreator}</>;
};

export default PlayerCreator;
