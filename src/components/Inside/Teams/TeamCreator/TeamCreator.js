import React from "react";
import classes from "./TeamCreator.module.css";

const TeamCreator = ({
  children,
  active,
  imgUploadProgress,
  onTeamNameChange,
  onFormSubmit,
  onImageSelect,
  onClose,
  onClick
}) => {
  const iconClass = active ? classes.Hide : null;
  const formClass = active ? classes.Relative : classes.Hide;
  const teamCreatorClass = active ? classes.TeamCreator : classes.NewTeam;

  return (
    <div className={teamCreatorClass} onClick={onClick}>
      <div className={iconClass}>
        <i className="fas fa-plus" style={{ marginRight: "30px" }}></i>
        <span>Add new team</span>
      </div>
      <form className={formClass} onSubmit={onFormSubmit}>
        <label>Set your team name:</label>
        <input
          type="text"
          placeholder="Team Name"
          className={classes.TextInput}
          onChange={onTeamNameChange}
          required
        />
        <p>Pick your team logo (optional):</p>
        <label htmlFor="file-upload" className={classes.Upload}>
          <i className="fas fa-upload" style={{ marginRight: "15px" }}></i>
          Upload file
        </label>
        <input type="submit" className={classes.Submit_btn} value="Submit" />
        <progress value={imgUploadProgress} max="100" />
        <output id="list" className={classes.uploadedImage}></output>
        <input id="file-upload" type="file" onChange={onImageSelect} />
        <i
          className={`far fa-times-circle ${classes.CloseIcon}`}
          onClick={onClose}
        ></i>
        {children}
      </form>
    </div>
  );
};

export default TeamCreator;
