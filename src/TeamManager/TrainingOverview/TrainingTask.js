import React, { useState } from 'react';
import classes from './TrainingTask.module.css';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import StylesProvider from '@material-ui/styles/StylesProvider';
import {
  Delete,
  Edit,
  Timer,
  Check,
  Close,
  RemoveCircle,
} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

const editedTaskInfoInitialObj = {
  taskTitle: '',
  taskDescription: '',
  duration: '',
  equipment: '',
};

const TrainingTask = ({
  taskId,
  taskTitle,
  taskDescription,
  duration,
  equipment,
  index,
  onEdit,
  onDelete,
}) => {
  const [trainingTaskActive, setTrainingTaskActive] = useState(false);
  const [editFormActive, setEditFormActive] = useState(false);
  const [editedTaskInfo, setEditedTaskInfo] = useState(
    editedTaskInfoInitialObj
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleTrainingTaskToggle = () => {
    setTrainingTaskActive((prevVal) => !prevVal);
  };

  const handleEditFormOpen = () => {
    setEditFormActive(true);
    setEditedTaskInfo({
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      duration: duration,
      equipment: equipment,
    });
  };

  const handleEditFormClose = () => {
    setEditFormActive(false);
    setEditedTaskInfo(editedTaskInfoInitialObj);
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setEditedTaskInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const trainingTask = editFormActive ? (
    <StylesProvider injectFirst>
      <Card className={classes.TrainingTask_Edit} variant="outlined">
        <div
          className={classes.TrainingTask_Edit__Header}
          onClick={handleEditFormClose}
        >
          <RemoveCircle className={classes.TrainingTask_Edit__RemoveIcon} />
          <Typography className={classes.TrainingTask_Edit__Title}>
            Edit task
          </Typography>
        </div>
        <form onChange={handleInputChange}>
          <div className={classes.TrainingTask_Edit__HeaderInputs_Wraper}>
            <div className={classes.TrainingTask_Edit__TitleInput_Wraper}>
              <TextField
                id="taskTitle"
                name="taskTitle"
                label="Task title"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 20,
                }}
                className={classes.TrainingTask_Edit__Input_Title}
                defaultValue={taskTitle}
              />
            </div>
            <div className={classes.TrainingTask_Edit__DurationInput_Wraper}>
              <TextField
                id="duration"
                name="duration"
                label="Duration"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 18,
                }}
                className={classes.TrainingTask_Edit__Input_Duration}
                defaultValue={duration}
              />
            </div>
          </div>
          <div className={classes.TrainingTask__Content}>
            <div
              className={classes.TrainingTask_Edit__TaskDescriptionInput_Wraper}
            >
              <TextField
                id="taskDescription"
                name="taskDescription"
                label="Task description"
                variant="outlined"
                size="small"
                multiline
                rows="7"
                className={classes.TrainingTask_Edit__Input_TaskDescription}
                defaultValue={taskDescription}
              />
            </div>
            <div className={classes.TrainingTask_Edit__TaskEquipment_Wraper}>
              <TextField
                id="equipment"
                name="equipment"
                label="Equipment"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 50,
                }}
                className={classes.TrainingTask_Edit__Input_TaskEquipment}
                defaultValue={equipment}
              />
              <div className={classes.TrainingTask_Edit__Icons}>
                <Tooltip
                  title="Save"
                  placement="bottom"
                  className={classes.TrainingTask_Edit__Icon_Save}
                  onClick={() => {
                    onEdit(taskId, editedTaskInfo);
                    handleEditFormClose();
                  }}
                >
                  <Check />
                </Tooltip>
                <Tooltip
                  title="Cancel"
                  placement="bottom"
                  className={classes.TrainingTask_Edit__Icon_Close}
                  onClick={handleEditFormClose}
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
            onClick={handleTrainingTaskToggle}
          >
            {index + 1}. {taskTitle}
          </Typography>
          <Typography className={classes.TrainingTask__TaskDuration}>
            <Timer className={classes.TrainingTask__TimerIcon} />
            {duration}
          </Typography>
          <Typography className={classes.TrainingTask__Icons}>
            <Tooltip
              title="Edit"
              placement="bottom"
              className={classes.TrainingTask__Icon_Edit}
              onClick={handleEditFormOpen}
            >
              <Edit />
            </Tooltip>
            <Tooltip
              title="Delete"
              placement="bottom"
              className={classes.TrainingTask__Icon_Delete}
              onClick={() => setDeleteModalOpen(true)}
            >
              <Delete />
            </Tooltip>
          </Typography>
          <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <Card className={classes.TrainingTask__Modal}>
              <span className={classes.TrainingTask__ModalMsg}>
                Are you sure you want to delete this task?
              </span>
              <div className={classes.TrainingTask__ModalButtons}>
                <button
                  className={`${classes.TrainingTask__ModalButton} ${classes.TrainingTask__ModalButton_Yes}`}
                  onClick={() => {
                    onDelete(taskId);
                    setDeleteModalOpen(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className={`${classes.TrainingTask__ModalButton} ${classes.TrainingTask__ModalButton_No}`}
                  onClick={() => setDeleteModalOpen(false)}
                >
                  No
                </button>
              </div>
            </Card>
          </Modal>
        </div>
        <Collapse in={trainingTaskActive}>
          <CardContent
            className={classes.TrainingTask__Content}
            style={{ padding: '0' }}
          >
            <Typography className={classes.TrainingTask__TaskDescription}>
              {taskDescription}
            </Typography>
            <Typography className={classes.TrainingTask__TaskEquipment}>
              Equipment:
              <span className={classes.TrainingTask__TaskEquipment_Text}>
                {equipment}
              </span>
            </Typography>
          </CardContent>
          <div></div>
        </Collapse>
      </Card>
    </StylesProvider>
  );

  return trainingTask;
};

export default TrainingTask;
