import React, { Component } from "react";
import classes from "./Player.module.css";
import FilePreviewElement from "../../../../UI/FilePreviewElement/FilePreviewElement";
import { StylesProvider } from "@material-ui/core/styles";
import defaultImage from "../../../../../assets/img/user.jpg";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

class Player extends Component {
  state = {
    editFormActive: false,
    updatedPlayerInfo: null,
    selectedImage: null,
    previewFile: "https://via.placeholder.com/45/eee?text=+",
  };

  handleEditFormOpen = () => {
    if (!this.state.editFormActive) {
      this.setState({
        editFormActive: true,
        updatedPlayerInfo: this.props.playerInfo,
      });
    }
  };

  handleEditFormClose = () => {
    this.setState({
      editFormActive: false,
      updatedPlayerInfo: { ...this.props.playerInfo },
      previewFile: "https://via.placeholder.com/45/eee?text=+",
      selectedImage: null,
    });
  };

  handleInputChange = ({ target }) => {
    const { id, value, name } = target;
    if (id !== "photo") {
      this.setState({
        updatedPlayerInfo: {
          ...this.state.updatedPlayerInfo,
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
      selectedImage: file,
    });
  };

  handleClearInput = ({ target }) => {
    target.placeholder = "";
  };

  render() {
    const player = this.state.editFormActive ? (
      <StylesProvider injectFirst>
        <form
          className={classes.Player_Edit}
          autoComplete="off"
          onChange={(event) => this.handleInputChange(event)}
        >
          <div className={classes.FileUploadSection}>
            <div className={classes.FileUploadSection__PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
              <label
                htmlFor="photo"
                className={
                  this.state.previewFile !==
                  "https://via.placeholder.com/45/eee?text=+"
                    ? classes.FileUploadSection__HelperText_Hide
                    : classes.FileUploadSection__HelperText
                }
              >
                <i className={`fas fa-plus`}></i>
              </label>
            </div>
            <input type="file" id="photo" onChange={this.handleImageSelect} />
          </div>
          <div
            className={`${classes.InputSection} ${classes.InputSection_Number} `}
          >
            <input
              type="text"
              id="number"
              className={`${classes.InputSection__TextInput} ${classes.InputSection__TextInput_Number}`}
              placeholder={this.props.playerInfo.number}
              onFocus={(event) => this.handleClearInput(event)}
            />
          </div>
          <div
            className={`${classes.InputSection} ${classes.InputSection_FirstName} `}
          >
            <input
              type="text"
              id="firstName"
              className={classes.InputSection__TextInput}
              placeholder={this.props.playerInfo.firstName}
              onFocus={(event) => this.handleClearInput(event)}
            />
          </div>
          <div
            className={`${classes.InputSection} ${classes.InputSection_LastName} `}
          >
            <input
              type="text"
              id="lastName"
              className={classes.InputSection__TextInput}
              placeholder={this.props.playerInfo.lastName}
              onFocus={(event) => this.handleClearInput(event)}
            />
          </div>
          <div className={classes.InputSection}>
            <select
              id="position"
              defaultValue={this.props.playerInfo.position}
              className={classes.SelectField}
            >
              <option value="goalkeeper">Goalkeeper</option>
              <option value="defender">Defender</option>
              <option value="midfielder">Midfielder</option>
              <option value="forward">Forward</option>
            </select>
          </div>
          <div
            className={`${classes.InputSection} ${classes.InputSection_Birthday} `}
          >
            <input
              type="date"
              id="birth"
              className={classes.InputSection__DateInput}
              defaultValue={this.props.playerInfo.birth}
            />
          </div>
          <div className={classes.ButtonsSection}>
            <div className={classes.Buttons}>
              <Tooltip title="Save" placement="bottom">
                <i
                  className={`fas fa-check ${classes.Buttons__Button} ${classes.Buttons__Button_Save}`}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.onSubmit(
                      this.props.playerId,
                      this.state.updatedPlayerInfo,
                      this.state.selectedImage
                    );
                    this.handleEditFormClose();
                  }}
                ></i>
              </Tooltip>
              <Tooltip title="Cancel" placement="bottom">
                <i
                  className={`fas fa-times ${classes.Buttons__Button} ${classes.Buttons__Button_Cancel}`}
                  variant="contained"
                  color="secondary"
                  onClick={this.handleEditFormClose}
                ></i>
              </Tooltip>
            </div>
          </div>
        </form>
      </StylesProvider>
    ) : (
      <StylesProvider injectFirst>
        <div className={classes.Player}>
          <div className={classes.Player__AvatarSection}>
            <Avatar
              alt={`Player Avatar`}
              src={this.props.playerPhoto || defaultImage}
              className={classes.AvatarSection__Avatar}
              variant="rounded"
            />
          </div>
          <div
            className={`${classes.Player__Info} ${classes.Player__Info_Number}`}
          >
            <span>{this.props.playerInfo.number}</span>
          </div>
          <div
            className={`${classes.Player__Info} ${classes.Player__Info_FirstName}`}
          >
            <span>{this.props.playerInfo.firstName}</span>
          </div>
          <div
            className={`${classes.Player__Info} ${classes.Player__Info_LastName}`}
          >
            <span>{this.props.playerInfo.lastName}</span>
          </div>
          <div
            className={`${classes.Player__Info} ${classes.Player__Info_Position}`}
          >
            <span>{this.props.playerInfo.position}</span>
          </div>
          <div
            className={`${classes.Player__Info} ${classes.Player__Info_Birthday}`}
          >
            <span>{this.props.playerInfo.birth}</span>
          </div>
          <div className={`${classes.Icons}`}>
            <Tooltip title="Edit" placement="bottom">
              <i
                className={`fas fa-edit ${classes.Icons__EditIcon}`}
                onClick={this.handleEditFormOpen}
              ></i>
            </Tooltip>
            <Tooltip title="Delete" placement="bottom">
              <i
                className={`fa fa-trash`}
                onClick={() =>
                  this.props.onDelete(
                    this.props.playerId,
                    this.props.playerPhoto
                  )
                }
              ></i>
            </Tooltip>
          </div>
          <div className={classes.Player__CheckboxSection}>
            {this.props.checkbox}
          </div>
        </div>
      </StylesProvider>
    );

    return <>{player}</>;
  }
}
export default Player;
