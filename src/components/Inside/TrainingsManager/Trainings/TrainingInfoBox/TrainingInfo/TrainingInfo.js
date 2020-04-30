import React, { Component } from "react";
import classes from "./TrainingInfo.module.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {
  Event,
  HourglassEmpty,
  HourglassFull,
  LocationOn,
  SportsSoccer,
  SignalCellularAlt,
  Edit,
} from "@material-ui/icons";
import StylesProvider from "@material-ui/styles/StylesProvider";

class TrainingInfo extends Component {
  state = {
    expanded: true,
    editFormActive: false,
    updatedTrainingInfo: {
      ...this.props.trainingInfo,
    },
  };

  handleTrainingCreatorToggle = () => {
    this.setState({ editFormActive: !this.state.editFormActive });
  };

  handleInputChange = ({ target }) => {
    const { id, value } = target;

    this.setState({
      updatedTrainingInfo: {
        ...this.state.updatedTrainingInfo,
        [id]: value,
      },
    });
  };

  handleSliderChange = (e, newValue) => {
    this.setState({
      updatedTrainingInfo: {
        ...this.state.updatedTrainingInfo,
        intensity: newValue,
      },
    });
  };

  handleEditFormOpen = () => {
    this.setState({
      editFormActive: true,
    });
  };

  handleEditFormClose = () => {
    this.setState({ editFormActive: false });
  };

  handleToggleInfoCard = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  updateTrainingInfo = (updatedTrainingInfo) => {
    this.setState({ updatedTrainingInfo });
  };

  render() {
    const {
      date,
      start,
      end,
      place,
      trainingType,
      intensity,
    } = this.props.trainingInfo;

    const defaultValueDate = date.replace(/[/]/g, "-");

    const trainingInfo = this.state.editFormActive ? (
      <StylesProvider injectFirst>
        <Card className={classes.TrainingInfo} variant="outlined">
          <h3
            className={classes.TrainingInfo__Label}
            onClick={this.handleToggleInfoCard}
          >
            Training Information
          </h3>
          <Collapse in={this.state.expanded}>
            <CardContent className={classes.TrainingInfo__Content}>
              <form
                className={classes.TrainingInfo__EditForm}
                onChange={this.handleInputChange}
              >
                <TextField
                  className={`${classes.Input}`}
                  id="date"
                  type="date"
                  variant="outlined"
                  size="small"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={defaultValueDate}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="start"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="Start"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={start}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="end"
                  type="time"
                  variant="outlined"
                  size="small"
                  label="End"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={end}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="place"
                  variant="outlined"
                  size="small"
                  label="Place"
                  defaultValue={place}
                />
                <TextField
                  className={`${classes.Input}`}
                  id="trainingType"
                  variant="outlined"
                  size="small"
                  label="Training type"
                  defaultValue={trainingType}
                />
                <Typography
                  className={classes.IntensityLabel}
                  id="intensity"
                  gutterBottom
                >
                  Intensity %
                </Typography>
                <Slider
                  className={`${classes.Input}`}
                  id="intensity"
                  size="small"
                  value={this.state.updatedTrainingInfo.intensity}
                  valueLabelDisplay="auto"
                  onChange={this.handleSliderChange}
                />
                <div className={classes.Buttons}>
                  <Button
                    className={classes.Buttons__Add}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      this.props.onFormSubmit(this.state.updatedTrainingInfo);
                      this.handleEditFormClose();
                    }}
                  >
                    add
                  </Button>
                  <Button
                    className={classes.Buttons__Cancel}
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={this.handleEditFormClose}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Collapse>
        </Card>
      </StylesProvider>
    ) : (
      <StylesProvider injectFirst>
        <Card className={classes.TrainingInfo} variant="outlined">
          <h3
            className={classes.TrainingInfo__Label}
            onClick={this.handleToggleInfoCard}
          >
            Training Information
          </h3>
          <Collapse in={this.state.expanded}>
            <CardContent className={classes.TrainingInfo__Content}>
              <Edit
                className={classes.Icon__Edit}
                onClick={this.handleEditFormOpen}
              />
              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  <Event className={`fas fa-calendar-alt ${classes.Icon}`} />
                  Date:
                  <span className={classes.InfoBox__Info}> {date}</span>
                </span>
              </div>
              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  {" "}
                  <HourglassEmpty
                    className={`fas fa-hourglass-start ${classes.Icon}`}
                  />{" "}
                  Start:
                  <span className={classes.InfoBox__Info}> {start}</span>
                </span>
              </div>
              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  {" "}
                  <HourglassFull
                    className={`fas fa-hourglass-end ${classes.Icon}`}
                  />
                  End:
                  <span className={classes.InfoBox__Info}>{end}</span>
                </span>
              </div>

              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  <LocationOn
                    className={`fas fa-map-marker-alt ${classes.Icon}`}
                  />
                  Place:
                  <span className={classes.InfoBox__Info}> {place}</span>
                </span>
              </div>
              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  <SportsSoccer className={`far fa-futbol ${classes.Icon}`} />
                  Type:
                  <span className={classes.InfoBox__Info}>{trainingType}</span>
                </span>
              </div>
              <div className={classes.InfoBox}>
                <span className={classes.InfoBox__InfoType}>
                  <SignalCellularAlt
                    className={`fas fa-signal ${classes.Icon}`}
                  />
                  Intensity:
                  <span className={classes.InfoBox__Info}>{intensity}</span>
                </span>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </StylesProvider>
    );

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    return <>{trainingInfo} </>;
  }
}

export default TrainingInfo;

// {
//   state = {
//     trainingCreatorActive: false,
//     newTrainingInfo: {
//       date: "",
//       start: "",
//       end: "",
//       place: "",
//       trainingType: "",
//       intensity: 0,
//     },
//   };

//   handleTrainingCreatorToggle = () => {
//     this.setState({ trainingCreatorActive: !this.state.trainingCreatorActive });
//   };

//   handleInputChange = ({ target }) => {
//     const { id, value } = target;

//     this.setState({
//       newTrainingInfo: {
//         ...this.state.newTrainingInfo,
//         [id]: value,
//       },
//     });
//   };

//   handleSliderChange = (e, newValue) => {
//     this.setState({
//       newTrainingInfo: { ...this.state.newTrainingInfo, intensity: newValue },
//     });
//   };

//   render() {
//     const arrowIcon = this.state.trainingCreatorActive ? (
//       <ArrowDropUp className={classes.Header__ArrowIcon}></ArrowDropUp>
//     ) : (
//       <ArrowDropDown className={classes.Header__ArrowIcon}></ArrowDropDown>
//     );

//     return (
//       <StylesProvider injectFirst>
//         <Card className={classes.SingleTrainingCreator} variant="outlined">
//           <Typography
//             variant="h6"
//             className={classes.SingleTrainingCreator__Header}
//             onClick={this.handleTrainingCreatorToggle}
//           >
//             1. Create single training day {arrowIcon}
//           </Typography>
//           <Collapse in={this.state.trainingCreatorActive}>
//             <CardContent className={classes.SingleTrainingCreator__Content}>
//               <form
//                 className={classes.SingleTrainingCreator__Form}
//                 onChange={this.handleInputChange}
//               >
//                 <TextField
//                   className={`${classes.Input}`}
//                   id="date"
//                   type="date"
//                   variant="outlined"
//                   size="small"
//                   label="Date"
//                   InputLabelProps={{ shrink: true }}
//                   defaultValue="2020-06-12"
//                 />
//                 <TextField
//                   className={`${classes.Input}`}
//                   id="start"
//                   type="time"
//                   variant="outlined"
//                   size="small"
//                   label="Start"
//                   InputLabelProps={{ shrink: true }}
//                 />
//                 <TextField
//                   className={`${classes.Input}`}
//                   id="end"
//                   type="time"
//                   variant="outlined"
//                   size="small"
//                   label="End"
//                   InputLabelProps={{ shrink: true }}
//                 />
//                 <TextField
//                   className={`${classes.Input}`}
//                   id="place"
//                   variant="outlined"
//                   size="small"
//                   label="Place"
//                 />
//                 <TextField
//                   className={`${classes.Input}`}
//                   id="trainingType"
//                   variant="outlined"
//                   size="small"
//                   label="Training type"
//                 />
//                 <Typography
//                   className={classes.IntensityLabel}
//                   id="intensity"
//                   gutterBottom
//                 >
//                   Intensity %
//                 </Typography>
//                 <Slider
//                   className={`${classes.Input}`}
//                   id="intensity"
//                   size="small"
//                   value={this.state.newTrainingInfo.intensity}
//                   valueLabelDisplay="auto"
//                   onChange={this.handleSliderChange}
//                 />
//                 <div className={classes.Buttons}>
//                   <Button
//                     className={classes.Buttons__Add}
//                     color="primary"
//                     variant="contained"
//                     size="small"
//                     onClick={(event) =>
//                       this.props.onFormSubmit(this.state.newTrainingInfo, event)
//                     }
//                   >
//                     add
//                   </Button>
//                   <Button
//                     className={classes.Buttons__Cancel}
//                     color="secondary"
//                     variant="contained"
//                     size="small"
//                   >
//                     cancel
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Collapse>
//         </Card>
//       </StylesProvider>
//     );
//   }
// }
