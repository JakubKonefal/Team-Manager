import React, { Component } from "react";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";
import { Avatar, Tooltip, Input, Button, Modal, Card } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import defaultTeamLogo from "../../../../../assets/img/default_team_logo.png";
import FilePreviewElement from "../../../../UI/FilePreviewElement/FilePreviewElement";

class Team extends Component {
  state = {
    editFormActive: false,
    newTeamName: "",
    selectedImage: "",
    previewFile: "https://via.placeholder.com/120/eee",
    deleteModalOpen: false,
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
        previewFile: "https://via.placeholder.com/120/eee",
      });
    }
  };

  handleModalOpen = () => {
    this.setState({ deleteModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ deleteModalOpen: false });
  };

  render() {
    const team = this.state.editFormActive ? (
      <li>
        <form className={classes.Team_Editable}>
          <div className={classes.Team_Editable__FileUploadSection}>
            <div className={classes.Team_Editable__PreviewFile}>
              <FilePreviewElement src={this.state.previewFile} />
            </div>
            <input
              type="file"
              id="teamLogo"
              name="teamLogo"
              onChange={this.handleImageSelect}
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
                placeholder={this.props.teamName}
                autoFocus
                onChange={this.handleTeamNameChange}
                color="default"
              />
              <div className={classes.Team_Editable__Buttons}>
                <Button
                  type="submit"
                  className={classes.Team_Editable__Button_Save}
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
                  className={classes.Team_Editable__Button_Cancel}
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
          className={classes.Team__TeamName}
          to={{
            pathname: `/my-teams/${this.props.teamId}/${this.props.teamName}`,
          }}
        >
          {this.props.teamName}
        </Link>

        <div className={classes.Team__Icons}>
          <Tooltip title="Delete" placement="bottom">
            <i
              className={`fa fa-trash ${classes.Team__Icon} ${classes.Team__Icon_Trash} `}
              onClick={this.handleModalOpen}
            ></i>
          </Tooltip>
          <Modal
            open={this.state.deleteModalOpen}
            onClose={this.handleModalClose}
          >
            <Card className={classes.Team__Modal}>
              <span className={classes.Team__ModalMsg}>
                Are you sure you want to delete this team?
              </span>
              <div className={classes.Team__ModalButtons}>
                <button
                  className={`${classes.Team__ModalButton} ${classes.Team__ModalButton_Yes}`}
                  onClick={() => {
                    const { onDelete, teamId, teamLogo } = this.props;
                    onDelete(teamId, teamLogo);
                    this.handleModalClose();
                  }}
                >
                  Yes
                </button>
                <button
                  className={`${classes.Team__ModalButton} ${classes.Team__ModalButton_No}`}
                  onClick={this.handleModalClose}
                >
                  No
                </button>
              </div>
            </Card>
          </Modal>
          <Tooltip title="Edit" placement="bottom">
            <i
              className={`fas fa-edit ${classes.Team__Icon} ${classes.Team__Icon_Edit}`}
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
