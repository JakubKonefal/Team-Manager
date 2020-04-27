import React from "react";
import classes from "./TrainingInfo.module.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import {
  Event,
  HourglassEmpty,
  HourglassFull,
  LocationOn,
  SportsSoccer,
  SignalCellularAlt,
} from "@material-ui/icons";
import StylesProvider from "@material-ui/styles/StylesProvider";

const TrainingInfo = ({
  date,
  start,
  end,
  place,
  trainingType,
  intensity,
  active,
  onClick,
}) => {
  return (
    <StylesProvider injectFirst>
      <Card className={classes.TrainingInfo} variant="outlined">
        <h3 className={classes.TrainingInfo__Label} onClick={onClick}>
          Training Information
        </h3>
        <Collapse in={active}>
          <CardContent className={classes.TrainingInfo__Content}>
            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                <Event className={`fas fa-calendar-alt ${classes.Icon}`} />
                Date:
                <span className={classes.InfoBox__Info}> {date}</span>
              </span>
            </div>
            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                {" "}
                <HourglassEmpty
                  className={`fas fa-hourglass-start ${classes.Icon}`}
                />{" "}
                Start:
                <span className={classes.InfoBox__Info}> {start}</span>
              </span>
            </div>
            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                {" "}
                <HourglassFull
                  className={`fas fa-hourglass-end ${classes.Icon}`}
                />
                End:
                <span className={classes.InfoBox__Info}>{end}</span>
              </span>
            </div>

            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                <LocationOn
                  className={`fas fa-map-marker-alt ${classes.Icon}`}
                />
                Place:
                <span className={classes.InfoBox__Info}> {place}</span>
              </span>
            </div>
            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                <SportsSoccer className={`far fa-futbol ${classes.Icon}`} />
                Type:
                <span className={classes.InfoBox__Info}>{trainingType}</span>
              </span>
            </div>
            <div className={classes.InfoBox}>
              <span className={classes.InfoBox__InfoType}>
                <SignalCellularAlt
                  className={`fas fa-signal ${classes.Icon}`}
                />
                Intensity:
                <span className={classes.InfoBox__Info}>{intensity}</span>
              </span>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </StylesProvider>
  );
};

export default TrainingInfo;
