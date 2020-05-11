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
    previewFile: "https://via.placeholder.com/100/eee",
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

  handleEditFormOpen = () => {
    if (!this.state.editFormActive) {
      this.setState({ editFormActive: true });
    }
  };

  handleEditFormClose = () => {
    this.setState({
      editFormActive: false,
      newTeamName: null,
    });
    if (this.state.selectedImage) {
      this.setState({
        selectedImage: null,
        previewFile: "https://via.placeholder.com/100/eee",
      });
    }
  };

  render() {
    const team = this.state.editFormActive ? (
      <li>
        <form className={classes.Team_EditForm}>
          <div className={classes.FileUploadSection}>
            <div className={classes.FileUploadSection__PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
            </div>
            <input
              type="file"
              id="teamLogo"
              onChange={this.handleImageSelect}
            />
            <label
              htmlFor="teamLogo"
              className={classes.FileUploadSection__HelperText}
            >
              Choose file..
            </label>
          </div>
          <div className={classes.MidColumnWraper}>
            <StylesProvider injectFirst>
              <Input
                type="text"
                className={classes.MidColumnWraper__Input}
                placeholder={this.props.teamName}
                autoFocus
                onChange={this.handleTeamNameChange}
                color="primary"
              />
              <div className={classes.Buttons}>
                <Button
                  type="submit"
                  className={classes.Buttons__Button_Update}
                  onClick={(event) => {
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
                  className={classes.Buttons__Button_Cancel}
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
      </li>
    ) : (
      <li className={classes.Team}>
        <StylesProvider injectFirst>
          <Avatar
            className={classes.Team__Avatar}
            src={this.props.teamLogo || defaultTeamLogo}
            alt="team-logo"
            variant="square"
          />
        </StylesProvider>

        <Link
          className={classes.Team__TeamName_Link}
          to={{
            pathname: `/my-teams/${this.props.teamId}`,
            teamId: this.props.teamId,
            teamName: this.props.teamName,
          }}
        >
          {this.props.teamName}
        </Link>

        <div className={classes.Icons}>
          <Tooltip title="Delete" placement="bottom">
            <i
              className={`fa fa-trash ${classes.Icons__Icon} ${classes.Icons__TrashIcon} `}
              onClick={() => {
                this.props.onDelete(this.props.teamId, this.props.teamLogo);
              }}
            ></i>
          </Tooltip>
          <Tooltip title="Edit" placement="bottom">
            <i
              className={`${classes.Icons__Icon} fas fa-edit `}
              onClick={this.handleEditFormOpen}
            ></i>
          </Tooltip>
        </div>
      </li>
    );

    return <>{team}</>;
  }
}

export default Team;
