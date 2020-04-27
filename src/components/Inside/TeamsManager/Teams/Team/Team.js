import React, { Component } from "react";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";
import { Avatar, Tooltip, Input, Button } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import defaultTeamLogo from "../../../../../assets/img/default_team_logo.png";
import FilePreviewElement from "../../../../UI/FilePreviewElement/FilePreviewElement";

class Team extends Component {
  state = {
    editFormActive: false,
    newTeamName: "",
    selectedImage: "",
    previewFile: "https://via.placeholder.com/100/eee"
  };

  handleTeamNameChange = e => {
    this.setState({ newTeamName: e.target.value });
  };

  handleImageSelect = e => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      selectedImage: file
    });
  };

  handleEditFormOpen = () => {
    if (!this.state.editFormActive) {
      this.setState({ editFormActive: true });
    }
  };

  handleEditFormClose = () => {
    this.setState({
      editFormActive: false,
      newTeamName: null
    });
    if (this.state.selectedImage) {
      this.setState({
        selectedImage: null,
        previewFile: "https://via.placeholder.com/100/eee"
      });
    }
  };

  render() {
    const team = this.state.editFormActive ? (
      <>
        <form className={classes.TeamEditor}>
          <div className={classes.FileSection}>
            <div className={classes.PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
            </div>
            <input
              type="file"
              id="teamLogo"
              onChange={this.handleImageSelect}
            />
            <label htmlFor="teamLogo" className={classes.Upload}>
              Choose file..
            </label>
          </div>
          <div className={classes.InputSection}>
            <StylesProvider injectFirst>
              <Input
                type="text"
                className={classes.Input_Text}
                placeholder={this.props.teamName}
                autoFocus
                onChange={this.handleTeamNameChange}
                color="primary"
              />
              <div className={classes.Buttons}>
                <Button
                  type="submit"
                  className={classes.Button_Update}
                  onClick={event => {
                    this.props.onSubmit(
                      this.props.teamId,
                      this.state.newTeamName,
                      this.state.selectedImage,
                      event
                    );
                    this.handleEditFormClose();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  className={classes.Button_Cancel}
                  onClick={this.handleEditFormClose}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </StylesProvider>
          </div>
        </form>
      </>
    ) : (
      <div className={classes.Team}>
        <StylesProvider injectFirst>
          <Avatar
            className={classes.Avatar}
            src={this.props.teamLogo || defaultTeamLogo}
            alt="team-logo"
            variant="square"
          />
        </StylesProvider>

        <Link
          className={classes.TeamName}
          to={{
            pathname: `/my-teams/${this.props.teamId}`,
            teamId: this.props.teamId,
            teamName: this.props.teamName
          }}
        >
          {this.props.teamName}
        </Link>

        <div className={classes.Team__Icons}>
          <Tooltip title="Delete" placement="bottom">
            <i
              className={`fa fa-trash ${classes.TrashIcon}`}
              onClick={() => {
                this.props.onDelete(this.props.teamId, this.props.teamLogo);
              }}
            ></i>
          </Tooltip>
          <Tooltip title="Edit" placement="bottom">
            <i className={`fas fa-edit`} onClick={this.handleEditFormOpen}></i>
          </Tooltip>
        </div>
      </div>
    );

    return <>{team}</>;
  }
}

export default Team;
