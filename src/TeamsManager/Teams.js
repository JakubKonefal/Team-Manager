import React, { useState, useEffect } from 'react';
import classes from './Teams.module.css';
import axios from 'axios';
import Team from './Team';
import TeamCreator from './TeamCreator';
import { storage, database } from '../firebase/firebase';

const Teams = ({ userId }) => {
  const [pending, setPending] = useState(true);
  const [teams, setTeams] = useState([]);

  const getInitialTeamsList = () => {
    axios.get(`/users/${userId}/teams.json`).then(({ data: teams }) => {
      if (teams) {
        const teamsList = Object.values(teams);
        setTeams(teamsList);
      }
      setPending(false);
    });
  };

  const handleImageUpload = async (teamId, selectedImage) => {
    await storage
      .ref(`users/${userId}/images/teams/${teamId}/team-logo/${teamId}`)
      .put(selectedImage);
  };

  const getUploadedImageUrl = async (teamId) => {
    const uploadedImageUrl = await storage
      .ref(`users/${userId}/images/teams/${teamId}/team-logo/${teamId}`)
      .getDownloadURL()
      .then((url) => {
        return url;
      });
    return uploadedImageUrl;
  };

  const assignUploadedImageUrl = (teamId, uploadedImageUrl) => {
    database
      .ref(`/users/${userId}/teams/${teamId}`)
      .update({ teamLogo: uploadedImageUrl });
  };

  const handleTeamNameUpdate = (teamId, updatedTeamName) => {
    database
      .ref(`/users/${userId}/teams/${teamId}`)
      .update({ teamName: updatedTeamName });
  };

  const handleTeamLogoUpdate = (teamId, updatedImage) => {
    handleImageUpload(teamId, updatedImage).then(() => {
      getUploadedImageUrl(teamId).then((url) => {
        assignUploadedImageUrl(teamId, url);
      });
    });
  };

  const updateTeamsOnAdd = (newTeam) => {
    const updatedTeamsArray = [...teams, newTeam];
    setTeams(updatedTeamsArray);
  };

  const updateTeamsArrayOnEdit = (teamId, updatedTeamName, updatedImage) => {
    const teamsArray = [...teams];
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

    setTeams(teamsArray);
  };

  const updateTeamsOnDelete = () => {
    const teamsDatabaseRef = database.ref(`users/${userId}/teams`);
    teamsDatabaseRef.once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      const teamsList = snapshotValue ? Object.values(snapshotValue) : [];
      setTeams(teamsList);
    });
  };

  const handleTeamDelete = (teamId, teamLogo) => {
    database.ref(`users/${userId}/teams/${teamId}`).remove();
    if (teamLogo) {
      storage
        .ref(`users/${userId}/images/teams/${teamId}/team-logo/${teamId}`)
        .delete();
    }
    updateTeamsOnDelete();
  };

  const handleFormSubmitNewTeam = (newTeamName, selectedImage, e) => {
    e.preventDefault();
    const databsseRef = database.ref(`/users/${userId}/teams`);
    const teamId = databsseRef.push().key;
    const newTeam = { teamName: newTeamName, teamId: teamId, teamLogo: '' };
    databsseRef.child(teamId).set(newTeam);

    selectedImage
      ? handleImageUpload(teamId, selectedImage).then(() => {
          getUploadedImageUrl(teamId).then((url) => {
            assignUploadedImageUrl(teamId, url);
            updateTeamsOnAdd({
              ...newTeam,
              teamLogo: url,
            });
          });
        })
      : updateTeamsOnAdd(newTeam);
  };

  const handleFormSubmitEditTeam = (
    teamId,
    updatedTeamName,
    updatedImage,
    e
  ) => {
    e.preventDefault();

    if (updatedTeamName && updatedImage) {
      handleTeamNameUpdate(teamId, updatedTeamName);
      handleTeamLogoUpdate(teamId, updatedImage);
    }
    if (updatedTeamName && !updatedImage) {
      handleTeamNameUpdate(teamId, updatedTeamName);
    }
    if (!updatedTeamName && updatedImage) {
      handleTeamLogoUpdate(teamId, updatedImage);
    }

    updateTeamsArrayOnEdit(teamId, updatedTeamName, updatedImage);
  };

  useEffect(getInitialTeamsList, []);

  if (pending) {
    return <div className={classes.Teams__Loader}></div>;
  }

  const userTeams =
    teams.length > 0 ? (
      <>
        {teams.map((team) => {
          return (
            <Team
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
              teamLogo={team.teamLogo}
              onSubmit={handleFormSubmitEditTeam}
              onDelete={handleTeamDelete}
            />
          );
        })}
      </>
    ) : (
      <h3 className={classes.Teams__NoTeamsMsg}>
        You have not created any teams yet!
      </h3>
    );

  return (
    <>
      {userTeams}
      <TeamCreator onSubmit={handleFormSubmitNewTeam} />
    </>
  );
};

export default Teams;
