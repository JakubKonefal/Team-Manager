import React, { Component } from "react";
import classes from "./TrainingTask.module.css";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StylesProvider from "@material-ui/styles/StylesProvider";
import {
  Delete,
  Edit,
  Timer,
  Check,
  Close,
  RemoveCircle,
} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

class TrainingTask extends Component {
  state = {
    trainingTaskActive: false,
    editFormActive: false,
    editedTaskInfo: {
      taskTitle: "",
      taskDescription: "",
      duration: "",
      equipment: "",
    },
  };

  handleTrainingTaskToggle = () => {
    this.setState({ trainingTaskActive: !this.state.trainingTaskActive });
  };

  handleEditFormOpen = () => {
    this.setState({
      editFormActive: true,
      editedTaskInfo: {
        taskTitle: this.props.taskTitle,
        taskDescription: this.props.taskDescription,
        duration: this.props.duration,
        equipment: this.props.equipment,
      },
    });
  };

  handleEditFormClose = () => {
    this.setState({
      editFormActive: false,
      editedTaskInfo: {
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
      editedTaskInfo: {
        ...this.state.editedTaskInfo,
        [id]: value,
      },
    });
  };

  render() {
    const trainingTask = this.state.editFormActive ? (
      <StylesProvider injectFirst>
        <Card className={classes.Task_Edit} variant="outlined">
          <div
            className={classes.TaskEdit__Header}
            onClick={this.handleEditFormClose}
          >
            <RemoveCircle className={classes.TaskEdit__Header_RemoveIcon} />
            <Typography className={classes.TaskEdit__Header_Label}>
              edit task
            </Typography>
          </div>
          <form onChange={this.handleInputChange}>
            <div className={classes.TaskHeader_Edit}>
              <div className={classes.TaskHeader__Title_Edit}>
                <Typography className={classes.TaskHeader__Index}>
                  {this.props.index + 1}.{" "}
                </Typography>{" "}
                <TextField
                  id="taskTitle"
                  label="Task title"
                  variant="outlined"
                  size="small"
                  className={classes.Input__TaskTitle}
                  defaultValue={this.props.taskTitle}
                />
              </div>

              <div className={classes.TaskHeader__Duration_Edit}>
                <Timer className={classes.TaskHeader__Duration_TimerIcon} />
                <TextField
                  id="duration"
                  label="Duration"
                  variant="outlined"
                  size="small"
                  className={classes.Input__TaskDuration}
                  defaultValue={this.props.duration}
                />
              </div>
            </div>
            <div className={classes.Task__Content}>
              <div className={classes.Task__TaskDescription_Edit}>
                <TextField
                  id="taskDescription"
                  label="Task description"
                  variant="outlined"
                  size="small"
                  multiline
                  rows="7"
                  className={classes.Input__TaskDescription}
                  defaultValue={this.props.taskDescription}
                />
              </div>
              <div className={classes.Task__TaskEquipment_Edit}>
                Equipment:{" "}
                <TextField
                  id="equipment"
                  label="Equipment"
                  variant="outlined"
                  size="small"
                  className={classes.Input__TaskEquipment}
                  defaultValue={this.props.equipment}
                />
                <div className={classes.TaskHeader__Icons_Edit}>
                  <Tooltip
                    title="Save"
                    placement="bottom"
                    className={classes.TaskHeader__IconConfirm}
                    onClick={() => {
                      this.props.onEdit(
                        this.props.taskId,
                        this.state.editedTaskInfo
                      );
                      this.handleEditFormClose();
                    }}
                  >
                    <Check />
                  </Tooltip>
                  <Tooltip
                    title="Cancel"
                    placement="bottom"
                    className={classes.TaskHeader__IconCancel}
                    onClick={this.handleEditFormClose}
                  >
                    <Close />
                  </Tooltip>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </StylesProvider>
    ) : (
      <StylesProvider injectFirst>
        <Card className={classes.Task} variant="outlined">
          <div className={classes.TaskHeader}>
            <Typography
              className={classes.TaskHeader__Title}
              onClick={this.handleTrainingTaskToggle}
            >
              {this.props.index + 1}. {this.props.taskTitle}
            </Typography>

            <Typography className={classes.TaskHeader__Duration}>
              <Timer className={classes.TaskHeader__Duration_TimerIcon} />
              {this.props.duration}
            </Typography>
            <Typography className={classes.TaskHeader__Icons}>
              <Tooltip
                title="Edit"
                placement="bottom"
                className={classes.TaskHeader__IconEdit}
                onClick={this.handleEditFormOpen}
              >
                <Edit />
              </Tooltip>
              <Tooltip
                title="Delete"
                placement="bottom"
                className={classes.TaskHeader__IconDelete}
                onClick={() => this.props.onDelete(this.props.taskId)}
              >
                <Delete />
              </Tooltip>
            </Typography>
          </div>
          <Collapse in={this.state.trainingTaskActive}>
            <CardContent
              className={classes.Task__Content}
              style={{ padding: "0" }}
            >
              <Typography className={classes.Task__TaskDescription}>
                {this.props.taskDescription}
              </Typography>
              <Typography className={classes.Task__TaskEquipment}>
                Equipment:{" "}
                <span className={classes.Task__TaskEquipment_Content}>
                  {this.props.equipment}
                </span>
              </Typography>
            </CardContent>
            <div></div>
          </Collapse>
        </Card>
      </StylesProvider>
    );

    return trainingTask;
  }
}

export default TrainingTask;
