import React, { Component } from "react";
import axios from "axios";
import { storage, database } from "../../firebase/firebase";
import classes from "./TeamsManager.module.css";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import TeamCreator from "../../components/Inside/Teams/TeamCreator/TeamCreator";
import Teams from "../../components/Inside/Teams/Teams";

class TeamsManager extends Component {
  state = {
    teams: null,
    newTeamName: null,
    newTeamLogo: null,
    uploadedImage: null,
    uploadedImageUrl: "",
    previewFile: null,
    imageUploadProgress: "",
    teamCreatorActive: false
  };

  componentDidMount() {
    axios.get("https://team-manager-b8e8c.firebaseio.com/.json").then(res => {
      const teams = res.data;
      if (teams) {
        const teamsIds = Object.keys(teams);
        const teamsArray = Object.values(teams);
        for (let i = 0; i < teamsIds.length; i++) {
          teamsArray[i].id = teamsIds[i];
        }
        const updatedTeams = [];
        updatedTeams.push(...teamsArray);
        this.setState({ teams: updatedTeams });
      } else {
        this.setState({ teams: [] });
      }
    });
  }

  handleTeamCreatorOpen = () => {
    if (!this.state.teamCreatorActive) {
      this.setState({ teamCreatorActive: true });
    }
  };

  handleTeamCreatorClose = () => {
    this.setState({ teamCreatorActive: false });
  };

  handleTeamNameChange = e => {
    this.setState({ newTeamName: e.target.value });
  };

  handleImageSelect = e => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      uploadedImage: file
    });
  };

  handleTeamCreate = uploadedImageUrl => {
    const newTeam = {
      teamName: this.state.newTeamName,
      players: [],
      teamLogo: uploadedImageUrl
    };
    this.handlePassDataToServer(newTeam);
  };

  handleTeamDelete = (teamId, teamName) => {
    database
      .ref(teamId)
      .remove()
      .then(() => {
        this.state.teams
          ? this.componentDidMount()
          : this.setState({ teams: [] });
      });
    storage.ref(`images/teams/${teamName}/team-logo/${teamName}`).delete();
  };

  handlePassDataToServer = async newTeam => {
    await axios.post(
      "https://team-manager-b8e8c.firebaseio.com/.json",
      newTeam
    );
    this.componentDidMount();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { uploadedImage, newTeamName } = this.state;

    const uploadTask = storage
      .ref(`images/teams/${newTeamName}/team-logo/${newTeamName}`)
      .put(uploadedImage);
    return uploadTask.on(
      "state_changed",
      snapshot => {
        const imageUploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ imageUploadProgress });
      },
      error => {},
      () => {
        storage
          .ref(`images/teams/${newTeamName}/team-logo/`)
          .child(newTeamName)
          .getDownloadURL()
          .then(url => {
            this.handleTeamCreate(url);
          });
      }
    );
  };

  render() {
    const filePreviewElement = this.state.previewFile && (
      <div>
        <img
          src={this.state.previewFile}
          className={classes.PreviewFile}
          alt="preview-img"
        />
        <h2>{this.state.previewFile.fileName}</h2>
      </div>
    );

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
              />
            </li>
            <li>
              <TeamCreator
                active={this.state.teamCreatorActive}
                imgUploadProgress={this.state.imageUploadProgress}
                onFormSubmit={this.handleFormSubmit}
                onTeamNameChange={this.handleTeamNameChange}
                onImageSelect={this.handleImageSelect}
                onClose={this.handleTeamCreatorClose}
                onClick={this.handleTeamCreatorOpen}
              >
                {filePreviewElement}
              </TeamCreator>
            </li>
          </ul>
        </MainContentWraper>
      </div>
    );
  }
}

export default TeamsManager;
