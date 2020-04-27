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
      newPlayerInfo: {},
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
        <div className={classes.FormTitle}>
          <h2 className={classes.FormTitle__Label}>Create new player</h2>
        </div>
        <form
          className={classes.PlayerCreator__Active}
          onChange={this.handleInputChange}
        >
          <div className={classes.FileSection}>
            <div className={classes.PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
            </div>
            <input type="file" id="photo" onChange={this.handleImageSelect} />
            <label htmlFor="photo" className={classes.Upload}>
              Choose file..
            </label>
          </div>

          <TextField
            id="number"
            label="Number"
            variant="outlined"
            className={classes.TextField}
          />
          <TextField
            id="firstName"
            label="First name"
            variant="outlined"
            className={classes.TextField}
            required
          />
          <TextField
            id="lastName"
            label="Last name"
            variant="outlined"
            className={classes.TextField}
            required
          />
          <FormControl variant="outlined" className={classes.SelectField}>
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
            defaultValue="1995-06-15"
            className={classes.TextField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.Buttons}>
            <Button
              type="submit"
              className={classes.Button_Add}
              variant="contained"
              color="primary"
              onClick={(event) => {
                this.props.onSubmit(
                  this.state.newPlayerInfo,
                  this.state.newPlayerPhoto,
                  event
                );
                this.handlePlayerCreatorClose();
              }}
            >
              add
            </Button>
            <Button
              className={classes.Button_Cancel}
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
      <div className={classes.PlayerCreator__Inactive}>
        <i
          className={`fas fa-user-plus ${classes.AddUserIcon}`}
          onClick={this.handlePlayerCreatorOpen}
        ></i>
        <span>add player</span>
      </div>
    );

    return <>{playerCreator}</>;
  }
}

export default PlayerCreator;
