import React, { Component } from "react";
import classes from "./PlayerCreator.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import StylesProvider from "@material-ui/styles/StylesProvider";
import FilePreviewElement from "../../../../UI/FilePreviewElement/FilePreviewElement";

class PlayerCreator extends Component {
  state = {
    playerCreatorActive: false,
    newPlayerInfo: {
      number: "",
      firstName: "",
      lastName: "",
      position: "",
      birth: "",
    },
    newPlayerPhoto: null,
    previewFile: "https://via.placeholder.com/100/eee",
  };

  handlePlayerCreatorOpen = () => {
    if (!this.state.playerCreatorActive) {
      this.setState({ playerCreatorActive: true });
    }
  };

  handlePlayerCreatorClose = () => {
    this.setState({
      playerCreatorActive: false,
      previewFile: "https://via.placeholder.com/100/eee",
      newPlayerInfo: {
        number: "",
        firstName: "",
        lastName: "",
        position: "",
        birth: "",
      },
    });
  };

  handleInputChange = ({ target }) => {
    const { id, value, name } = target;
    if (id !== "photo") {
      this.setState({
        newPlayerInfo: {
          ...this.state.newPlayerInfo,
          [id || name]: value,
        },
      });
    }
  };

  handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      newPlayerPhoto: file,
    });
  };

  render() {
    const playerCreator = this.state.playerCreatorActive ? (
      <StylesProvider injectFirst>
        <div className={classes.PlayerCreatorHeader}>
          <h2 className={classes.PlayerCreatorHeader__Title}>
            Create new player
          </h2>
        </div>
        <form
          className={classes.PlayerCreator}
          onChange={this.handleInputChange}
          onSubmit={(event) => {
            this.props.onSubmit(
              this.state.newPlayerInfo,
              this.state.newPlayerPhoto,
              event
            );
            this.handlePlayerCreatorClose();
          }}
        >
          <div className={classes.FileUploadSection}>
            <div className={classes.FileUploadSection__PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
            </div>
            <input type="file" id="photo" onChange={this.handleImageSelect} />
            <label
              htmlFor="photo"
              className={classes.FileUploadSection__HelperText}
            >
              Choose file..
            </label>
          </div>

          <TextField
            id="number"
            label="Number"
            variant="outlined"
            className={classes.PlayerCreator__Input}
          />
          <TextField
            id="firstName"
            label="First name"
            variant="outlined"
            className={classes.PlayerCreator__Input}
            required
          />
          <TextField
            id="lastName"
            label="Last name"
            variant="outlined"
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
              onChange={this.handleInputChange}
              value={this.state.newPlayerInfo.position}
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
            id="birth"
            label="Birthday"
            type="date"
            className={classes.PlayerCreator__Input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.Buttons}>
            <Button
              type="submit"
              className={classes.Buttons__Button_Add}
              variant="contained"
              color="primary"
            >
              add
            </Button>
            <Button
              className={classes.Buttons__Button_Cancel}
              variant="contained"
              color="secondary"
              onClick={this.handlePlayerCreatorClose}
            >
              cancel
            </Button>
          </div>
        </form>
      </StylesProvider>
    ) : (
      <div className={classes.PlayerCreator_Inactive}>
        <i
          className={`fas fa-user-plus ${classes.PlayerCreator_Inactive__AddUserIcon}`}
          onClick={this.handlePlayerCreatorOpen}
        ></i>
        <span>add player</span>
      </div>
    );

    return <>{playerCreator}</>;
  }
}

export default PlayerCreator;
