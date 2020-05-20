import React, { Component } from "react";
import classes from "./TaskCreator.module.css";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StylesProvider from "@material-ui/styles/StylesProvider";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import { TextField } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

class TaskCreator extends Component {
  state = {
    taskCreatorActive: false,
    newTaskInfo: {
      taskTitle: "",
      taskDescription: "",
      duration: "",
      equipment: "",
    },
  };

  handleTaskCreatorToggle = () => {
    this.setState({ taskCreatorActive: !this.state.taskCreatorActive });
  };

  handleTaskCreatorCancel = () => {
    this.setState({
      taskCreatorActive: false,
      newTaskInfo: {
        taskTitle: "",
        taskDescription: "",
        duration: "",
        equipment: "",
      },
    });
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      newTaskInfo: {
        ...this.state.newTaskInfo,
        [id]: value,
      },
    });
  };

  render() {
    const circleHelperIcon = this.state.taskCreatorActive ? (
      <RemoveCircle className={classes.TaskCreator__AddIcon} />
    ) : (
      <AddCircle className={classes.TaskCreator__AddIcon} />
    );

    return (
      <StylesProvider injectFirst>
        <Card variant="outlined">
          <div
            className={classes.TaskCreator__Header}
            onClick={this.handleTaskCreatorToggle}
          >
            {circleHelperIcon}
            <Typography className={classes.TaskCreator__Title}>
              Add new task
            </Typography>
          </div>
          <Collapse in={this.state.taskCreatorActive}>
            <CardContent className={classes.TaskCreator__Content}>
              <form
                className={classes.TaskCreator__Form}
                onChange={(event) => this.handleInputChange(event)}
                onSubmit={(event) => {
                  this.props.onFormSubmit(this.state.newTaskInfo, event);
                  this.handleTaskCreatorCancel();
                }}
              >
                <TextField
                  className={classes.TaskCreator__Input}
                  id="taskTitle"
                  variant="outlined"
                  size="small"
                  label="Task Title"
                  required
                />
                <TextField
                  className={classes.TaskCreator__Input}
                  id="taskDescription"
                  variant="outlined"
                  label="Task Description"
                  multiline
                  rows="7"
                />
                <TextField
                  className={classes.TaskCreator__Input}
                  id="equipment"
                  variant="outlined"
                  size="small"
                  label="Equipment"
                />
                <TextField
                  className={`${classes.TaskCreator__Input} ${classes.TaskCreator__Input_Duration}`}
                  id="duration"
                  variant="outlined"
                  size="small"
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
                    variant="contained"
                    color="secondary"
                    onClick={this.handleTaskCreatorCancel}
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
  }
}

export default TaskCreator;
