import React from "react";
import classes from "./PlayerCreator.module.css";

const playerCreator = props => {
  const iconClass = props.active ? classes.Hide : null;
  const formClass = props.active ? classes.Relative : classes.Hide;
  const playerCreatorClass = props.active
    ? classes.PlayerCreator
    : classes.NewPlayer;

  return (
    <div className={playerCreatorClass} onClick={props.clicked}>
      <div className={iconClass}>
        <i className={`fas fa-plus ${classes.icon}`}></i>
        <span>Add new player</span>
      </div>
      <form className={formClass} onChange={props.change}>
        <label htmlFor="number" className={classes.InputLabel}>
          Number:
        </label>
        <input type="text" name="number" id="number" placeholder="1-99" />
        <label htmlFor="firstName" className={classes.InputLabel}>
          First name:
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
        />
        <label htmlFor="lastName" className={classes.InputLabel}>
          Last name:
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
        />
        <label htmlFor="position" className={classes.InputLabel}>
          Position:
        </label>
        <select id="position">
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>
        <label htmlFor="birth" className={classes.InputLabel}>
          Date of birth:
        </label>
        <input type="date" name="birth" id="birth" />
        <p>Pick player's photo:</p>
        <output id="list" className={classes.uploadedImage}></output>

        <button onClick={props.createPlayer}>Submit</button>
        <i
          className="far fa-times-circle"
          onClick={props.cancelled}
          style={{ position: "absolute", top: "5px", right: "-20px" }}
        ></i>
        {props.children}
        <progress value={props.progress} max="100" />
      </form>
      <input type="file" id="file-upload" onChange={props.addImg} />
      <label htmlFor="file-upload" className={classes.Upload}>
        <i className="fas fa-upload" style={{ marginRight: "15px" }}></i>
        Upload file
      </label>
    </div>
  );
};

export default playerCreator;
