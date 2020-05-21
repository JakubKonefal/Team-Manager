import React, { Component } from "react";
import classes from "./TrainingMonth.module.css";
import { database } from "../../../../../../firebase/firebase";
import Checkbox from "@material-ui/core/Checkbox";
import Training from "../../Training/Training";
import TrainingsListInfoBar from "../../TrainingsListInfoBar/TrainingsListInfoBar";
import Collapse from "@material-ui/core/Collapse";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import MultipleTrainingsEdit from "./MultipleTrainingsEditor/MultipleTrainingsEditor";

class TrainingMonth extends Component {
  state = {
    trainings: this.props.trainings,
    trainingsCheckboxes: this.props.checkboxes,
    monthExpanded: true,
    editFormActive: false,
    checkedTrainingsCount: 0,
    deleteModalOpen: false,
  };

  componentDidUpdate() {
    if (this.props.trainings.length !== this.state.trainings.length) {
      this.setState({
        trainings: this.props.trainings,
        trainingsCheckboxes: this.props.checkboxes,
      });
    }
  }

  handleToggleMonthExpand = () => {
    this.setState({ monthExpanded: !this.state.monthExpanded });
  };

  countCheckedTrainings = (checkboxes) => {
    const checkedTrainingsCount = checkboxes.filter((item) => item.checked)
      .length;
    this.setState({ checkedTrainingsCount });
  };

  handleCheckboxSelectAll = ({ target }) => {
    const updatedCheckboxes = this.state.trainingsCheckboxes;
    updatedCheckboxes.forEach((item) => {
      item.checked = target.checked;
    });
    this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckboxClick = ({ target }, index, id) => {
    const updatedCheckboxes = [...this.state.trainingsCheckboxes];
    const clickedCheckbox = { checked: target.checked, id };
    updatedCheckboxes.splice(index, 1, clickedCheckbox);

    this.countCheckedTrainings(updatedCheckboxes);
    this.setState({ trainingsCheckboxes: updatedCheckboxes });
  };

  handleCheckedTrainingsDelete = () => {
    const { userId, teamId, year, month } = this.props;
    const checkedTrainings = this.state.trainingsCheckboxes.filter(
      (item) => item.checked
    );
    checkedTrainings.forEach((training) =>
      database
        .ref(
          `/users/${userId}/teams/${teamId}/trainings/${year}/${month}/${training.id}`
        )
        .remove()
    );

    this.props.updateTrainings();
  };

  handleCheckedTrainingsEdit = (editedTrainingsInfo) => {
    const { userId, teamId, year, month } = this.props;
    const { date, ...restInfo } = editedTrainingsInfo;
    const checkedTrainings = this.state.trainingsCheckboxes.filter(
      (item) => item.checked
    );
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

  handleTrainingsSort = (e, attribute) => {
    const sortedTrainings = [...this.state.trainings].sort((a, b) =>
      a.trainingInfo[attribute] > b.trainingInfo[attribute] ? 1 : -1
    );

    if (e.ctrlKey) {
      sortedTrainings.reverse();
    }

    this.setState({
      trainings: sortedTrainings,
    });
  };

  handleEditFormOpen = () => {
    this.setState({ editFormActive: true });
  };

  handleEditFormClose = () => {
    this.setState({ editFormActive: false });
  };

  handleModalOpen = () => {
    this.setState({ deleteModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ deleteModalOpen: false });
  };

  render() {
    const trainings = this.state.trainings
      ? this.state.trainings.map((training, index) => (
          <Training
            {...training.trainingInfo}
            key={training.trainingId}
            teamId={this.props.teamId}
            trainingId={training.trainingId}
            checkbox={
              <Checkbox
                checked={this.state.trainingsCheckboxes[index].checked}
                onClick={(event) =>
                  this.handleCheckboxClick(event, index, training.trainingId)
                }
                index={index}
              />
            }
            year={this.props.year}
            month={this.props.month}
          />
        ))
      : null;

    const buttons = this.state.editFormActive ? null : (
      <div>
        <button
          className={`${classes.Button} ${classes.Button_Edit}`}
          disabled={this.state.checkedTrainingsCount < 1}
          onClick={this.handleEditFormOpen}
        >
          edit
        </button>
        <button
          className={`${classes.Button} ${classes.Button_Delete}`}
          onClick={this.handleModalOpen}
        >
          delete
        </button>
        <Modal
          open={this.state.deleteModalOpen}
          onClose={this.handleModalClose}
        >
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
                  this.handleCheckedTrainingsDelete();
                  this.handleModalClose();
                }}
              >
                Yes
              </button>
              <button
                className={`${classes.TrainingMonth__ModalButton} ${classes.TrainingMonth__ModalButton_No}`}
                onClick={this.handleModalClose}
              >
                No
              </button>
            </div>
          </Card>
        </Modal>
      </div>
    );

    return this.state.trainings.length > 0 ? (
      <>
        <div className={classes.TrainingMonthHeader}>
          <div>
            <Checkbox color="default" onClick={this.handleCheckboxSelectAll} />{" "}
          </div>
          <h5
            className={classes.TrainingMonthHeader__Title}
            onClick={this.handleToggleMonthExpand}
          >
            {`${this.props.year} ${this.props.month}`}
          </h5>
        </div>
        <Collapse in={this.state.monthExpanded}>
          <div className={classes.TrainingMonthList}>
            <TrainingsListInfoBar sort={this.handleTrainingsSort} />
            {trainings}
          </div>

          <div className={classes.TrainingMonthActions}>
            <MultipleTrainingsEdit
              onFormSubmit={this.handleCheckedTrainingsEdit}
              checkedTrainingsCount={this.state.checkedTrainingsCount}
              active={this.state.editFormActive}
              close={this.handleEditFormClose}
              year={this.props.year}
              month={this.props.month}
            />
            {buttons}
          </div>
        </Collapse>
      </>
    ) : null;
  }
}

export default TrainingMonth;
