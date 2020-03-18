import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase/firebase";
import classes from "./TeamsManager.module.css";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import TeamCreator from "../../components/Inside/Teams/TeamCreator/TeamCreator";
import Teams from "../../components/Inside/Teams/Teams";
// import Spinner from "../../components/UI/Spinner/Spinner";

class TeamsManager extends Component {
  state = {
    teams: [],
    addNewTeamClicked: false,
    submitDisabled: true,
    newTeamName: null,
    newTeamLogo: null,
    uploadedImage: null,
    uploadedImageUrl: "",
    previewFile: null,
    fetchedImage: null,
    progress: ""
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
      }
    });
  }

  newTeamClickedHandler = () => {
    if (!this.state.addNewTeamClicked) {
      this.setState({ addNewTeamClicked: true });
    }
  };

  createCancelledHandler = () => {
    this.setState({ addNewTeamClicked: false });
  };

  handleFileSelect = e => {
    const file = e.target.files[0];
    const previewFile = URL.createObjectURL(file);
    this.setState({
      previewFile: previewFile,
      uploadedImage: file
    });
  };

  fileUploadHandler = event => {
    event.preventDefault();
    const { uploadedImage, newTeamName } = this.state;
    const uploadTask = storage
      .ref(`images/teams/${newTeamName}/team-logo/${uploadedImage.name}`)
      .put(uploadedImage);
    return uploadTask.on(
      "state_changed",
      snapshot => {
        // console.log(snapshot);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/teams/${newTeamName}/team-logo/`)
          .child(uploadedImage.name)
          .getDownloadURL()
          .then(url => {
            this.createTeamHandler(url);
          });
      }
    );
  };

  txtChangeHandler = event => {
    this.setState({ newTeamName: event.target.value });
    const submitDisabled = !this.state.newTeamName;
    this.setState({ submitDisabled });
  };

  sendData = async newTeam => {
    await axios.post(
      "https://team-manager-b8e8c.firebaseio.com/.json",
      newTeam
    );
    this.componentDidMount();
  };

  createTeamHandler = uploadedImageUrl => {
    const newTeam = {
      teamName: this.state.newTeamName,
      players: [],
      teamLogo: uploadedImageUrl
    };
    this.sendData(newTeam);
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
              <Teams teams={this.state.teams} />
            </li>
            <li>
              <TeamCreator
                active={this.state.addNewTeamClicked}
                btnDisabled={this.state.submitDisabled}
                txtChange={this.txtChangeHandler}
                createTeam={this.fileUploadHandler}
                addImg={this.handleFileSelect}
                cancelled={this.createCancelledHandler}
                clicked={this.newTeamClickedHandler}
                progress={this.state.progress}
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
