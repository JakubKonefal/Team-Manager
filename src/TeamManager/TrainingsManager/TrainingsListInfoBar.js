import React from 'react';
import classes from './TrainingsListInfoBar.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import Sort from '@material-ui/icons/Sort';

const TrainingsListInfoBar = ({ sort }) => (
  <>
    <Tooltip title="Ctrl + click to sort in opposite order" placement="top">
      <span className={classes.TrainingsListInfoBar__Tile}>
        <Sort className={classes.TrainingsListInfoBar__SortIcon} />
      </span>
    </Tooltip>
    <span
      className={classes.TrainingsListInfoBar__Tile}
      onClick={(event) => sort(event, 'date')}
    >
      Date
    </span>
    <span className={classes.TrainingsListInfoBar__Tile}>Weekday</span>
    <span
      className={classes.TrainingsListInfoBar__Tile}
      onClick={(event) => sort(event, 'start')}
    >
      Start
    </span>
    <span
      className={`${classes.TrainingsListInfoBar__Tile} ${classes.TrainingsListInfoBar__Tile_End}`}
      onClick={(event) => sort(event, 'end')}
    >
      End
    </span>
    <span
      className={classes.TrainingsListInfoBar__Tile}
      onClick={(event) => sort(event, 'place')}
    >
      Place
    </span>
    <span
      className={classes.TrainingsListInfoBar__Tile}
      onClick={(event) => sort(event, 'trainingType')}
    >
      Training Type
    </span>
    <span
      className={`${classes.TrainingsListInfoBar__Tile} ${classes.TrainingsListInfoBar__Tile_Intensity}`}
      onClick={(event) => sort(event, 'intensity')}
    >
      Intensity
    </span>
  </>
);

export default TrainingsListInfoBar;
