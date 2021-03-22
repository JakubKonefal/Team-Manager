import React, { useState } from 'react';
import classes from './TrainingPlan.module.css';
import TrainingTasks from './TrainingTasks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

const TrainingPlan = ({ userId }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpandedToggle = () => {
    setExpanded((prevVal) => !prevVal);
  };

  return (
    <Card variant="outlined" className={classes.TrainingPlan}>
      <h2
        className={classes.TrainingPlan__Header}
        onClick={handleExpandedToggle}
      >
        Training Plan
      </h2>
      <Collapse in={expanded}>
        <CardContent className={classes.TrainingPlan__Content}>
          <TrainingTasks userId={userId} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TrainingPlan;
