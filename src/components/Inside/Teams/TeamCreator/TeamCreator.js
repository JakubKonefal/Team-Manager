import React from "react";
import classes from "./TeamCreator.module.css";

const teamCreator = props => {
  let iconClass = null;
  let formClass = classes.Hide;
  let teamCreatorClass = classes.NewTeam;
  if (props.active) {
    iconClass = classes.Hide;
    formClass = classes.Relative;
    teamCreatorClass = classes.TeamCreator;
  }

  return (
    <li className={teamCreatorClass} onClick={props.clicked}>
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
        <output id="list" className={classes.uploadedImage}></output>
        <input id="file-upload" type="file" onChange={props.addImg} />
        <i
          className="far fa-times-circle"
          onClick={props.cancelled}
          style={{ position: "absolute", top: "-15px", right: "-15px" }}
        ></i>
      </form>
    </li>
  );
};

export default teamCreator;
