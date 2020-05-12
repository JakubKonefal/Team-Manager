import React, { Component } from "react";
import classes from "./Outside.module.css";
import Logo from "../../assets/img/logo.png";
import Register from "../Register/Register";
import StylesProvider from "@material-ui/styles/StylesProvider";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

class Outside extends Component {
  state = {
    signUpOpen: false,
    loginOpen: false,
  };

  handleModalOpen = (modal) => {
    this.setState({ [modal]: true });
  };

  handleModalClose = () => {
    this.setState({ signUpOpen: false, loginOpen: false });
  };

  render() {
    return (
      <div className={classes.Background}>
        <div className={classes.PageWraper}>
          <div className={classes.TopBar}>
            <img src={Logo} className={classes.TopBar__Logo_Img} alt="Logo" />
            <h4 className={classes.TopBar__Logo_Label}>localCoach</h4>
            <nav className={classes.Navigation}>
              <span className={classes.Navigation__Item_Text}>Home</span>
              <span className={classes.Navigation__Item_Text}>Contact</span>
              <div className={classes.Buttons}>
                <button
                  className={`${classes.Buttons__Button} ${classes.Buttons__Button_SignUp} `}
                  onClick={() => this.handleModalOpen("signUpOpen")}
                >
                  sign up
                </button>
                <button
                  className={`${classes.Buttons__Button} ${classes.Buttons__Button_Login} `}
                  onClick={() => this.handleModalOpen("loginOpen")}
                >
                  login
                </button>
              </div>
            </nav>
          </div>
          <div className={classes.Description}>
            <h2 className={classes.Description__Title}>football</h2>
            <h3 className={classes.Description__Subtitle}>team - manager</h3>
            <p className={classes.Description__Text}>
              Manage your football teams online. Gather all information about
              teams, players and trainings in one place!
            </p>
          </div>
        </div>
        <StylesProvider injectFirst>
          <Modal open={this.state.signUpOpen} onClose={this.handleModalClose}>
            <DialogContent className={classes.ModalContent}>
              <Register />
            </DialogContent>
          </Modal>
          {/* <Modal open={this.state.loginOpen} onClose={this.handleModalClose}>
          <p className={classes.Modal_SignUp}>LOGIN</p>
        </Modal> */}
        </StylesProvider>
      </div>
    );
  }
}

export default Outside;
