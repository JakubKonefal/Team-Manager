import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Training.module.css';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Moment from 'react-moment';

const Training = ({
  date,
  start,
  end,
  place,
  trainingType,
  intensity,
  teamId,
  teamName,
  trainingId,
  checkbox,
  year,
  month,
}) => {
  const dateObj = new Date(date);

  return (
    <>
      <span className={classes.ListItem__Tile}>
        <StylesProvider injectFirst>{checkbox}</StylesProvider>
      </span>
      <span className={classes.ListItem__Tile}>
        <Link
          to={`/my-teams/${teamId}/${teamName}/trainings/${year}/${month}/${trainingId}`}
          className={classes.ListItem__Date}
        >
          {date}
        </Link>
      </span>
      <Moment className={classes.ListItem__Tile} date={dateObj} format="dddd" />
      <span className={classes.ListItem__Tile}>{start}</span>
      <span
        className={`${classes.ListItem__Tile} ${classes.ListItem__TileText_End}`}
      >
        {end}
      </span>
      <span className={classes.ListItem__Tile}>{place}</span>
      <span className={classes.ListItem__Tile}>{trainingType}</span>
      <span
        className={`${classes.ListItem__Tile} ${classes.ListItem__Tile_Last}`}
      >
        {intensity}
      </span>
    </>
  );
};

export default Training;
