import React, { useState, useEffect } from 'react';
import classes from './TrainingMonth.module.css';
import { database } from '../../firebase/firebase';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Checkbox from '@material-ui/core/Checkbox';
import Training from './Training';
import TrainingsListInfoBar from './TrainingsListInfoBar';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import MultipleTrainingsEditor from './MultipleTrainingsEditor';

const TrainingMonth = ({
  userId,
  teamId,
  teamName,
  year,
  month,
  trainings,
  updateTrainings,
  checkboxes,
}) => {
  const [trainingsList, setTrainingsList] = useState(trainings);
  const [trainingsCheckboxes, setTrainingsCheckboxes] = useState(checkboxes);
  const [monthExpanded, setMonthExpanded] = useState(true);
  const [editFormActive, setEditFormActive] = useState(false);
  const [checkedTrainingsCount, setCheckedTrainingsCount] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleToggleMonthExpand = () => {
    setMonthExpanded((prevVal) => !prevVal);
  };

  const countCheckedTrainings = (checkboxes) => {
    const checkedTrainingsQuantity = checkboxes.filter((item) => item.checked)
      .length;
    setCheckedTrainingsCount(checkedTrainingsQuantity);
  };

  const handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = trainingsCheckboxes;
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });
    countCheckedTrainings(updatedCheckboxes);
    setTrainingsCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxClick = ({ target }, index, id) => {
    const updatedCheckboxes = [...trainingsCheckboxes];
    const clickedCheckbox = { checked: target.checked, id };
    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    countCheckedTrainings(updatedCheckboxes);
    setTrainingsCheckboxes(updatedCheckboxes);
  };

  const handleCheckedTrainingsDelete = () => {
    const checkedTrainings = trainingsCheckboxes.filter((item) => item.checked);
    checkedTrainings.forEach((training) =>
      database
        .ref(
          `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${training.id}`
        )
        .remove()
    );

    updateTrainings();
    setCheckedTrainingsCount(0);
  };

  const handleCheckedTrainingsEdit = (editedTrainingsInfo) => {
    const { date, ...restInfo } = editedTrainingsInfo;
    const checkedTrainings = trainingsCheckboxes.filter((item) => item.checked);
    const updatedInfo =
      checkedTrainings.length > 1 ? restInfo : editedTrainingsInfo;
    checkedTrainings.forEach((training) =>
      database
        .ref(
          `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${training.id}/trainingInfo`
        )
        .update(updatedInfo)
    );
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleTrainingsSort = (e, attribute) => {
    const sortedTrainings = [...trainings].sort((a, b) =>
      a.trainingInfo[attribute] > b.trainingInfo[attribute] ? 1 : -1
    );

    if (e.ctrlKey) {
      sortedTrainings.reverse();
    }

    setTrainingsList(sortedTrainings);
  };

  useEffect(() => {
    if (trainings.length !== trainingsList.length) {
      setTrainingsList(trainings);
      setTrainingsCheckboxes(checkboxes);
    }
  }, [trainings]);

  const trainingsInMonth = trainingsList
    ? trainingsList.map((training, index) => (
        <Training
          {...training.trainingInfo}
          key={training.trainingId}
          teamId={teamId}
          teamName={teamName}
          trainingId={training.trainingId}
          checkbox={
            <StylesProvider injectFirst>
              <Checkbox
                className={classes.TrainingMonth__TrainingCheckbox}
                checked={trainingsCheckboxes[index].checked}
                onClick={(event) =>
                  handleCheckboxClick(event, index, training.trainingId)
                }
                index={index}
              />
            </StylesProvider>
          }
          year={year}
          month={month}
        />
      ))
    : null;

  const buttons = editFormActive ? null : (
    <div>
      <button
        className={`${classes.Button} ${classes.Button_Edit}`}
        disabled={checkedTrainingsCount < 1}
        onClick={() => setEditFormActive(true)}
      >
        edit
      </button>
      <button
        className={`${classes.Button} ${classes.Button_Delete}`}
        disabled={checkedTrainingsCount < 1}
        onClick={() => setDeleteModalOpen(true)}
      >
        delete
      </button>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Card className={classes.TrainingMonth__Modal}>
          <span className={classes.TrainingMonth__ModalMsg}>
            Are you sure you want to delete
          </span>
          <span className={classes.TrainingMonth__ModalMsg}>
            checked trainings?
          </span>
          <div className={classes.TrainingMonth__ModalButtons}>
            <button
              className={`${classes.TrainingMonth__ModalButton} ${classes.TrainingMonth__ModalButton_Yes}`}
              onClick={() => {
                handleCheckedTrainingsDelete();
                setDeleteModalOpen(false);
              }}
            >
              Yes
            </button>
            <button
              className={`${classes.TrainingMonth__ModalButton} ${classes.TrainingMonth__ModalButton_No}`}
              onClick={() => setDeleteModalOpen(false)}
            >
              No
            </button>
          </div>
        </Card>
      </Modal>
    </div>
  );

  return trainingsList.length > 0 ? (
    <>
      <div className={classes.TrainingMonthHeader}>
        <div>
          <Checkbox color="default" onClick={handleCheckboxSelectAll} />
        </div>
        <h5
          className={classes.TrainingMonthHeader__Title}
          onClick={handleToggleMonthExpand}
        >
          <span className={classes.TrainingMonthHeader__Title_Year}>
            {year}
          </span>
          <span>{month}</span>
        </h5>
      </div>
      <Collapse in={monthExpanded}>
        <div className={classes.TrainingMonthList}>
          <TrainingsListInfoBar sort={handleTrainingsSort} />
          {trainingsInMonth}
        </div>

        <div className={classes.TrainingMonthActions}>
          <MultipleTrainingsEditor
            onFormSubmit={handleCheckedTrainingsEdit}
            checkedTrainingsCount={checkedTrainingsCount}
            active={editFormActive}
            onClose={() => setEditFormActive(false)}
            year={year}
            month={month}
          />
          {buttons}
        </div>
      </Collapse>
    </>
  ) : null;
};

export default TrainingMonth;
