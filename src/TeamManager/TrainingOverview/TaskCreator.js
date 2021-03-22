import React, { useState } from 'react';
import classes from './TaskCreator.module.css';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StylesProvider from '@material-ui/styles/StylesProvider';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { TextField } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

const newTaskInfoInitialObj = {
  taskTitle: '',
  taskDescription: '',
  duration: '',
  equipment: '',
};

const TaskCreator = ({ onSubmit }) => {
  const [taskCreatorActive, setTaskCreatorActive] = useState(false);
  const [newTaskInfo, setNewTaskInfo] = useState(newTaskInfoInitialObj);

  const handleTaskCreatorToggle = () => {
    setTaskCreatorActive((prevVal) => !prevVal);
  };

  const handleTaskCreatorCancel = () => {
    setTaskCreatorActive(false);
    setNewTaskInfo(newTaskInfoInitialObj);
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setNewTaskInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const circleHelperIcon = taskCreatorActive ? (
    <RemoveCircle className={classes.TaskCreator__AddIcon} />
  ) : (
    <AddCircle className={classes.TaskCreator__AddIcon} />
  );

  return (
    <StylesProvider injectFirst>
      <Card variant="outlined">
        <div
          className={classes.TaskCreator__Header}
          onClick={handleTaskCreatorToggle}
        >
          {circleHelperIcon}
          <Typography className={classes.TaskCreator__Title}>
            Add new task
          </Typography>
        </div>
        <Collapse in={taskCreatorActive}>
          <CardContent className={classes.TaskCreator__Content}>
            <form
              className={classes.TaskCreator__Form}
              onChange={(event) => handleInputChange(event)}
              onSubmit={(event) => {
                onSubmit(newTaskInfo, event);
                handleTaskCreatorCancel();
              }}
            >
              <TextField
                className={classes.TaskCreator__Input}
                id="taskTitle"
                name="taskTitle"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 20,
                }}
                label="Task Title"
                required
              />
              <TextField
                className={classes.TaskCreator__Input}
                id="taskDescription"
                name="taskDescription"
                variant="outlined"
                label="Task Description"
                multiline
                rows="7"
              />
              <TextField
                className={classes.TaskCreator__Input}
                id="equipment"
                name="equipment"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 50,
                }}
                label="Equipment"
              />
              <TextField
                className={`${classes.TaskCreator__Input} ${classes.TaskCreator__Input_Duration}`}
                id="duration"
                name="duration"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 18,
                }}
                label="Duration"
              />
              <div className={classes.TaskCreator__Buttons}>
                <Button
                  className={classes.TaskCreator__Button_Add}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  add task
                </Button>
                <Button
                  className={classes.TaskCreator__Button_Cancel}
                  variant="contained"
                  color="secondary"
                  onClick={handleTaskCreatorCancel}
                  type="reset"
                >
                  cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </StylesProvider>
  );
};

export default TaskCreator;
