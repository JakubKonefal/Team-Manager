import React from "react";
import classes from "./TeamCreator.module.css";

const TeamCreator = props => {
  const iconClass = props.active ? classes.Hide : null;
  const formClass = props.active ? classes.Relative : classes.Hide;
  const teamCreatorClass = props.active ? classes.TeamCreator : classes.NewTeam;

  return (
    <div className={teamCreatorClass} onClick={props.clicked}>
      <div className={iconClass}>
        <i className="fas fa-plus" style={{ marginRight: "30px" }}></i>
        <span>Add new team</span>
      </div>
      <form className={formClass}>
        <p>Set your team name:</p>
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          className={classes.TextInput}
          onChange={props.txtChange}
        />
        <p>Pick your team logo (optional):</p>
        <label htmlFor="file-upload" className={classes.Upload}>
          <i className="fas fa-upload" style={{ marginRight: "15px" }}></i>
          Upload file
        </label>
        <button
          className={classes.Submit_btn}
          disabled={props.btnDisabled}
          onClick={props.createTeam}
        >
          Submit
        </button>
        <progress value={props.progress} max="100" />
        <output id="list" className={classes.uploadedImage}></output>
        <input id="file-upload" type="file" onChange={props.addImg} />
        <i
          className={`far fa-times-circle ${classes.CloseIcon}`}
          onClick={props.cancelled}
        ></i>
        {props.children}
      </form>
    </div>
  );
};

export default TeamCreator;
