import React from "react";
import classes from "./TrainingInfoBox.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import Sort from "@material-ui/icons/Sort";

const TrainingInfoBox = ({ sort }) => (
  <>
    <Tooltip title="Ctrl + click to sort in opposite order" placement="top">
      <span className={classes.InfoBox__Item}>
        {" "}
        <Sort className={classes.InfoBox__SortIcon} />
      </span>
    </Tooltip>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "date")}
    >
      Date{" "}
    </span>
    <span className={classes.InfoBox__Item}>Weekday</span>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "start")}
    >
      Start
    </span>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "end")}
    >
      End
    </span>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "place")}
    >
      Place
    </span>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "trainingType")}
    >
      Training Type
    </span>
    <span
      className={classes.InfoBox__Item}
      onClick={(event) => sort(event, "intensity")}
    >
      Intensity
    </span>
  </>
);

export default TrainingInfoBox;
