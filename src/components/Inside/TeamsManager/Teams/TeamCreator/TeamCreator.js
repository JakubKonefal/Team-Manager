import React, { Component } from "react";
import classes from "./TeamCreator.module.css";
import { Input, Button } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import FilePreviewElement from "../../../../UI/FilePreviewElement/FilePreviewElement";

class TeamCreator extends Component {
  state = {
    teams: [],
    newTeamName: null,
    newTeamLogo: null,
    selectedImage: null,
    uploadedImageUrl: "",
    previewFile: "https://via.placeholder.com/120/eee",
    teamCreatorActive: false,
  };

  handleTeamCreatorOpen = () => {
    if (!this.state.teamCreatorActive) {
      this.setState({ teamCreatorActive: true });
    }
  };

  handleTeamCreatorClose = () => {
    this.setState({
      teamCreatorActive: false,
      newTeamName: null,
    });
    if (this.state.selectedImage)
      this.setState({
        selectedImage: null,
        previewFile: "https://via.placeholder.com/120/eee",
      });
  };

  handleTeamNameChange = (e) => {
    this.setState({ newTeamName: e.target.value });
  };

  handleImageSelect = (e) => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      selectedImage: file,
    });
  };

  submitBtnDisabled = () => {
    return this.state.newTeamName ? false : true;
  };

  render() {
    const teamCreator = this.state.teamCreatorActive ? (
      <form className={classes.TeamCreator}>
        <div className={classes.TeamCreator__FileUploadSection}>
          <div className={classes.TeamCreator__PreviewFile}>
            <FilePreviewElement src={this.state.previewFile} />
          </div>
          <input type="file" id="teamLogo" onChange={this.handleImageSelect} />
          <label
            htmlFor="teamLogo"
            className={classes.TeamCreator__PrevFileHelperText}
          >
            Choose file..
          </label>
        </div>
        <div className={classes.TeamCreator__MidColumnWraper}>
          <StylesProvider injectFirst>
            <Input
              type="text"
              className={classes.TeamCreator__Input}
              placeholder="Team Name"
              autoFocus
              onChange={this.handleTeamNameChange}
              color="primary"
              required
            />
            <div className={classes.TeamCreator__Buttons}>
              <Button
                type="submit"
                className={classes.TeamCreator__Button_Update}
                onClick={(event) => {
                  this.props.onSubmit(
                    this.state.newTeamName,
                    this.state.selectedImage,
                    event
                  );
                  this.handleTeamCreatorClose();
                }}
                disabled={this.submitBtnDisabled()}
                variant="contained"
                color="primary"
              >
                add
              </Button>
              <Button
                className={classes.TeamCreator__Button_Cancel}
                onClick={this.handleTeamCreatorClose}
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
        onClick={this.handleTeamCreatorOpen}
      >
        <i
          className={`fas fa-users ${classes.TeamCreator_Inactive__UsersIcon}`}
        >
          <i
            className={`fas fa-plus ${classes.TeamCreator_Inactive__UsersIcon_Plus}`}
          ></i>
        </i>
        <span>add team</span>
      </div>
    );

    return <>{teamCreator}</>;
  }
}

export default TeamCreator;
