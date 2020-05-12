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
        <Card className={classes.TrainingTask_Edit} variant="outlined">
          <div
            className={classes.TrainingTask_Edit__Header}
            onClick={this.handleEditFormClose}
          >
            <RemoveCircle className={classes.TrainingTask_Edit__RemoveIcon} />
            <Typography className={classes.TrainingTask_Edit__Title}>
              edit task
            </Typography>
          </div>
          <form onChange={this.handleInputChange}>
            <div className={classes.TrainingTask_Edit__HeaderInputs_Wraper}>
              <div className={classes.TrainingTask_Edit__TitleInput_Wraper}>
                <Typography className={classes.TrainingTask_Edit__TaskIndex}>
                  {this.props.index + 1}.{" "}
                </Typography>{" "}
                <TextField
                  id="taskTitle"
                  label="Task title"
                  variant="outlined"
                  size="small"
                  className={classes.TrainingTask_Edit__Input_Title}
                  defaultValue={this.props.taskTitle}
                />
              </div>

              <div className={classes.TrainingTask_Edit__DurationInput_Wraper}>
                <Timer />
                <TextField
                  id="duration"
                  label="Duration"
                  variant="outlined"
                  size="small"
                  className={classes.TrainingTask_Edit__Input_Duration}
                  defaultValue={this.props.duration}
                />
              </div>
            </div>
            <div className={classes.TrainingTask__Content}>
              <div
                className={
                  classes.TrainingTask_Edit__TaskDescriptionInput_Wraper
                }
              >
                <TextField
                  id="taskDescription"
                  label="Task description"
                  variant="outlined"
                  size="small"
                  multiline
                  rows="7"
                  className={classes.TrainingTask_Edit__Input_TaskDescription}
                  defaultValue={this.props.taskDescription}
                />
              </div>
              <div className={classes.TrainingTask_Edit__TaskEquipment_Wraper}>
                Equipment:{" "}
                <TextField
                  id="equipment"
                  label="Equipment"
                  variant="outlined"
                  size="small"
                  className={classes.TrainingTask_Edit__Input_TaskEquipment}
                  defaultValue={this.props.equipment}
                />
                <div className={classes.TrainingTask_Edit__Icons}>
                  <Tooltip
                    title="Save"
                    placement="bottom"
                    className={classes.TrainingTask_Edit__Icon_Save}
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
                    className={classes.TrainingTask_Edit__Icon_Close}
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
        <Card className={classes.TrainingTask} variant="outlined">
          <div className={classes.TrainingTask__TaskHeader}>
            <Typography
              className={classes.TrainingTask__TaskTitle}
              onClick={this.handleTrainingTaskToggle}
            >
              {this.props.index + 1}. {this.props.taskTitle}
            </Typography>

            <Typography className={classes.TrainingTask__TaskDuration}>
              <Timer className={classes.TrainingTask__TimerIcon} />
              {this.props.duration}
            </Typography>
            <Typography className={classes.TrainingTask__Icons}>
              <Tooltip
                title="Edit"
                placement="bottom"
                className={classes.TrainingTask__Icon_Edit}
                onClick={this.handleEditFormOpen}
              >
                <Edit />
              </Tooltip>
              <Tooltip
                title="Delete"
                placement="bottom"
                className={classes.TrainingTask__Icon_Delete}
                onClick={() => this.props.onDelete(this.props.taskId)}
              >
                <Delete />
              </Tooltip>
            </Typography>
          </div>
          <Collapse in={this.state.trainingTaskActive}>
            <CardContent
              className={classes.TrainingTask__Content}
              style={{ padding: "0" }}
            >
              <Typography className={classes.TrainingTask__TaskDescription}>
                {this.props.taskDescription}
              </Typography>
              <Typography className={classes.TrainingTask__TaskEquipment}>
                Equipment:{" "}
                <span className={classes.TrainingTask__TaskEquipment_Text}>
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
