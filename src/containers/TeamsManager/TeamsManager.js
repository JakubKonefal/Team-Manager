import React, { Component } from "react";
import axios from "axios";
import { storage, database } from "../../firebase/firebase";
import classes from "./TeamsManager.module.css";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import TeamCreator from "../../components/Inside/Teams/TeamCreator/TeamCreator";
import Teams from "../../components/Inside/Teams/Teams";
import FilePreviewElement from "../../components/UI/FilePreviewElement/FilePreviewElement";

class TeamsManager extends Component {
  state = {
    teams: [],
    newTeamName: null,
    newTeamLogo: null,
    selectedImage: null,
    uploadedImageUrl: "",
    previewFile: null,
    imageUploadProgress: "",
    teamCreatorActive: false
  };

  componentDidMount() {
    axios.get("https://team-manager-b8e8c.firebaseio.com/.json").then(res => {
      const teams = res.data;
      if (teams) {
        const fetchedTeams = Object.values(teams);
        const teamsArray = [];
        teamsArray.push(...fetchedTeams);
        this.setState({ teams: teamsArray });
      }
    });
  }

  handleTeamCreatorOpen = () => {
    if (!this.state.teamCreatorActive) {
      this.setState({ teamCreatorActive: true });
    }
  };

  handleTeamCreatorClose = () => {
    this.setState({
      teamCreatorActive: false,
      newTeamName: null,
      selectedImage: null,
      previewFile: null
    });
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

  handleImageUpload = async (teamId, selectedImage) => {
    await storage
      .ref(`images/teams/${teamId}/team-logo/${teamId}`)
      .put(selectedImage);
  };

  handleGetUploadedImageUrl = async teamId => {
    await storage
      .ref(`images/teams/${teamId}/team-logo/${teamId}`)
      .getDownloadURL()
      .then(url => {
        this.setState({ uploadedImageUrl: url });
      });
  };

  handleTeamDelete = (teamId, teamLogo) => {
    database
      .ref(teamId)
      .remove()
      .then(() => {
        this.state.teams
          ? this.componentDidMount()
          : this.setState({ teams: [] });
      });
    if (teamLogo) {
      storage.ref(`images/teams/${teamId}/team-logo/${teamId}`).delete();
    }
  };

  handleTeamNameUpdate = (teamId, updatedTeamName) => {
    database
      .ref(`/${teamId}`)
      .update({ teamName: updatedTeamName })
      .then(this.componentDidMount());
  };

  handleTeamLogoUpdate = (teamId, image, updatedImage) => {
    if (image) {
      storage.ref(`images/teams/${teamId}/team-logo/${teamId}`).delete();
    }
    this.handleImageUpload(teamId, updatedImage).then(() => {
      this.handleGetUploadedImageUrl(teamId).then(() => {
        this.handleAddTeamLogoUrl(teamId);
        this.componentDidMount();
      });
    });
  };

  handleAddTeamLogoUrl = teamId => {
    database
      .ref(`/${teamId}`)
      .update({ teamLogo: this.state.uploadedImageUrl })
      .then(this.componentDidMount());
  };

  handleUpdateTeamFormSubmit = (
    teamId,
    image,
    updatedTeamName,
    updatedImage,
    e
  ) => {
    e.preventDefault();

    if (updatedTeamName && updatedImage) {
      this.handleTeamNameUpdate(teamId, updatedTeamName);
      this.handleTeamLogoUpdate(teamId, image, updatedImage);
    }
    if (updatedTeamName && !updatedImage) {
      this.handleTeamNameUpdate(teamId, updatedTeamName);
    }
    if (!updatedTeamName && updatedImage) {
      this.handleTeamLogoUpdate(teamId, image, updatedImage);
    }
  };

  handleNewTeamFormSubmit = e => {
    e.preventDefault();
    const { selectedImage, newTeamName } = this.state;
    const databaseRootRef = database.ref();
    const teamId = databaseRootRef.push().key;
    databaseRootRef.child(teamId).set({
      teamName: newTeamName,
      teamId: teamId,
      teamLogo: ""
    });

    selectedImage
      ? this.handleImageUpload(teamId, selectedImage).then(() => {
          this.handleGetUploadedImageUrl(teamId).then(() => {
            this.handleAddTeamLogoUrl(teamId);
          });
        })
      : this.componentDidMount();
  };

  render() {
    return (
      <div>
        <MainContentWraper>
          <ul>
            <li>
              <h1 className={classes.Choose_label}>
                Choose team to manage or create a new one:
              </h1>
            </li>
            <li>
              <Teams
                teams={this.state.teams}
                onDelete={this.handleTeamDelete}
                onSubmit={this.handleUpdateTeamFormSubmit}
              />
            </li>
            <li>
              <TeamCreator
                active={this.state.teamCreatorActive}
                imgUploadProgress={this.state.imageUploadProgress}
                onFormSubmit={this.handleNewTeamFormSubmit}
                onTeamNameChange={this.handleTeamNameChange}
                onImageSelect={this.handleImageSelect}
                onClose={this.handleTeamCreatorClose}
                onClick={this.handleTeamCreatorOpen}
              >
                <FilePreviewElement src={this.state.previewFile} />
              </TeamCreator>
            </li>
          </ul>
        </MainContentWraper>
      </div>
    );
  }
}

export default TeamsManager;
