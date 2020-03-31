import React, { useState } from "react";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";
import { Avatar, Tooltip, Input, Button } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import defaultTeamLogo from "../../../../assets/img/default_team_logo.png";
import FilePreviewElement from "../../../UI/FilePreviewElement/FilePreviewElement";

const Team = ({ teamId, teamName, teamLogo, onDelete, onSubmit }) => {
  const [showEditForm, toggleEditForm] = useState(false);
  const [inputTextValue, onInputChange] = useState("");
  const [inputImage, onImageChange] = useState(null);
  const [previewFile, onImageChange2] = useState(null);

  const contentToRender = showEditForm ? (
    <>
      <form className={classes.TeamEditor}>
        <div className={classes.FileSection}>
          <div className={classes.PreviewFile}>
            <FilePreviewElement src={previewFile} />
          </div>
          <input
            type="file"
            id="teamLogo"
            onChange={event => {
              onImageChange(event.target.files[0]);
              onImageChange2(URL.createObjectURL(event.target.files[0]));
            }}
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
              placeholder={teamName}
              autoFocus
              onChange={event => onInputChange(event.target.value)}
              color="primary"
            />
            <div className={classes.Buttons}>
              <Button
                type="submit"
                className={classes.Button_Update}
                onClick={event =>
                  onSubmit(teamId, teamLogo, inputTextValue, inputImage, event)
                }
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className={classes.Button_Cancel}
                onClick={() => {
                  toggleEditForm(!showEditForm);
                  onImageChange2(null);
                }}
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
          src={teamLogo || defaultTeamLogo}
          alt="team-logo"
          variant="square"
        />
      </StylesProvider>

      <Link
        className={classes.TeamName}
        to={{
          pathname: `/my-teams/${teamId}`,
          teamId: teamId,
          teamName: teamName
        }}
      >
        {teamName}
      </Link>

      <div className={classes.Team__Icons}>
        <Tooltip title="Delete" placement="bottom">
          <i
            className={`fa fa-trash ${classes.TrashIcon}`}
            onClick={() => {
              onDelete(teamId, teamLogo);
            }}
          ></i>
        </Tooltip>
        <Tooltip title="Edit" placement="bottom">
          <i
            className={`fas fa-edit`}
            onClick={() => toggleEditForm(!showEditForm)}
          ></i>
        </Tooltip>
      </div>
    </div>
  );

  return <>{contentToRender}</>;
};

export default Team;
