import React, { Component } from "react";
import axios from "axios";
import Team from "./Team/Team";
import TeamCreator from "./TeamCreator/TeamCreator";
import { storage, database } from "../../../../firebase/firebase";

class Teams extends Component {
  state = {
    teams: [],
    newTeamName: null,
    newTeamLogo: null,
    selectedImage: null,
    uploadedImageUrl: "",
    previewFile: null,
    teamCreatorActive: false,
  };

  componentDidMount() {
    axios.get("https://team-manager-b8e8c.firebaseio.com/.json").then((res) => {
      const teams = res.data;
      if (teams) {
        const teamsArr = Object.values(teams);
        this.setState({ teams: teamsArr });
      }
    });
  }

  handleFormSubmitEditTeam = (teamId, updatedTeamName, updatedImage, e) => {
    e.preventDefault();

    if (updatedTeamName && updatedImage) {
      this.handleTeamNameUpdate(teamId, updatedTeamName);
      this.handleTeamLogoUpdate(teamId, updatedImage);
    }
    if (updatedTeamName && !updatedImage) {
      this.handleTeamNameUpdate(teamId, updatedTeamName);
    }
    if (!updatedTeamName && updatedImage) {
      this.handleTeamLogoUpdate(teamId, updatedImage);
    }

    this.updateTeamsArrayOnTeamUpdate(teamId, updatedTeamName, updatedImage);
  };

  handleFormSubmitNewTeam = (newTeamName, selectedImage, e) => {
    e.preventDefault();
    const databaseRootRef = database.ref();
    const teamId = databaseRootRef.push().key;
    const newTeam = { teamName: newTeamName, teamId: teamId, teamLogo: "" };
    databaseRootRef.child(teamId).set(newTeam);

    selectedImage
      ? this.handleImageUpload(teamId, selectedImage).then(() => {
          this.getUploadedImageUrl(teamId).then(() => {
            this.assignUploadedImageUrl(teamId);
            this.updateTeamsArrayOnTeamAdd({
              ...newTeam,
              teamLogo: this.state.uploadedImageUrl,
            });
          });
        })
      : this.updateTeamsArrayOnTeamAdd(newTeam);
  };

  handleImageUpload = async (teamId, selectedImage) => {
    await storage
      .ref(`images/teams/${teamId}/team-logo/${teamId}`)
      .put(selectedImage);
  };

  getUploadedImageUrl = async (teamId) => {
    await storage
      .ref(`images/teams/${teamId}/team-logo/${teamId}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ uploadedImageUrl: url });
      });
  };

  assignUploadedImageUrl = (teamId) => {
    database
      .ref(`/${teamId}`)
      .update({ teamLogo: this.state.uploadedImageUrl });
  };

  handleTeamNameUpdate = (teamId, updatedTeamName) => {
    database.ref(`/${teamId}`).update({ teamName: updatedTeamName });
  };

  handleTeamLogoUpdate = (teamId, updatedImage) => {
    this.handleImageUpload(teamId, updatedImage).then(() => {
      this.getUploadedImageUrl(teamId).then(() => {
        this.assignUploadedImageUrl(teamId);
      });
    });
  };

  updateTeamsArrayOnTeamAdd = (newTeam) => {
    const updatedTeamsArray = [...this.state.teams, newTeam];
    this.setState({ teams: updatedTeamsArray });
  };

  updateTeamsArrayOnTeamUpdate = (teamId, updatedTeamName, updatedImage) => {
    const teamsArray = [...this.state.teams];
    let updatedTeam = teamsArray.find((team) => {
      return team.teamId === teamId;
    });
    const updatedImageUrl = updatedImage
      ? URL.createObjectURL(updatedImage)
      : null;

    if (updatedTeamName && updatedImage) {
      updatedTeam = {
        ...updatedTeam,
        teamName: updatedTeamName,
        teamLogo: updatedImageUrl,
      };
    }
    if (!updatedTeamName && updatedImage) {
      updatedTeam = { ...updatedTeam, teamLogo: updatedImageUrl };
    }
    if (updatedTeamName && !updatedImage) {
      updatedTeam = { ...updatedTeam, teamName: updatedTeamName };
    }

    const updatedTeamIndex = teamsArray.findIndex((team) => {
      return team.teamId === teamId;
    });
    teamsArray.splice(updatedTeamIndex, 1, updatedTeam);

    this.setState({ teams: teamsArray });
  };

  updateTeamsArrayOnTeamDelete = (teamId) => {
    const currentTeamsArr = [...this.state.teams];
    const updatedTeamsArr = currentTeamsArr.filter(
      (team) => team.teamId !== teamId
    );
    this.setState({ teams: updatedTeamsArr });
  };

  handleTeamDelete = (teamId, teamLogo) => {
    database.ref(teamId).remove();
    if (teamLogo) {
      storage.ref(`images/teams/${teamId}/team-logo/${teamId}`).delete();
    }
    this.updateTeamsArrayOnTeamDelete(teamId);
  };

  render() {
    const userTeams = this.state.teams && (
      <>
        {this.state.teams.map((team) => {
          return (
            <Team
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
              teamLogo={team.teamLogo}
              onDelete={this.handleTeamDelete}
              onSubmit={this.handleFormSubmitEditTeam}
            />
          );
        })}
      </>
    );
    return (
      <>
        {userTeams}
        <TeamCreator onSubmit={this.handleFormSubmitNewTeam} />
      </>
    );
  }
}

export default Teams;
