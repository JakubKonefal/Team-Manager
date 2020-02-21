import React from "react";
import classes from "./PlayerCreator.module.css";

const playerCreator = props => {
  let iconClass = null;
  let formClass = classes.Hide;
  let playerCreatorClass = classes.NewPlayer;
  if (props.active) {
    iconClass = classes.Hide;
    formClass = classes.Relative;
    playerCreatorClass = classes.PlayerCreator;
  }

  return (
    <div className={playerCreatorClass} onClick={props.clicked}>
      <div className={iconClass}>
        <i className="fas fa-plus" style={{ marginRight: "30px" }}></i>
        <span>Add new player</span>
      </div>
      <form className={formClass}>
        <label htmlFor="number" className={classes.InputLabel}>
          Number:
        </label>
        <input
          type="text"
          name="number"
          id="number"
          placeholder="1-99"
          onChange={props.change}
        />
        <label htmlFor="firstName" className={classes.InputLabel}>
          First name:
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          onChange={props.change}
        />
        <label htmlFor="lastName" className={classes.InputLabel}>
          Last name:
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          onChange={props.change}
        />
        <label htmlFor="position" className={classes.InputLabel}>
          Position:
        </label>
        <select id="position" onChange={props.change}>
          <option value="goalkeeper">Goalkeeper</option>
          <option value="defender">Defender</option>
          <option value="midfielder">Midfielder</option>
          <option value="forward">Forward</option>
        </select>
        <label htmlFor="birth" className={classes.InputLabel}>
          Date of birth:
        </label>
        <input type="date" name="birth" id="birth" onChange={props.change} />
        <p>Pick player's photo:</p>
        <output id="list" className={classes.uploadedImage}></output>
        <input type="file" id="file-upload" onChange={props.addImg} />
        <label htmlFor="file-upload" className={classes.Upload}>
          <i className="fas fa-upload" style={{ marginRight: "15px" }}></i>
          Upload file
        </label>
        <button onClick={props.createPlayer}>Submit</button>
        <i
          className="far fa-times-circle"
          onClick={props.cancelled}
          style={{ position: "absolute", top: "5px", right: "-20px" }}
        ></i>
      </form>
    </div>
  );
};

export default playerCreator;
