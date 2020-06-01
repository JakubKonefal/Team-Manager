import React, { Component } from "react";
import classes from "./Outside.module.css";
import Logo from "../../assets/img/logo.png";
import Register from "../Register/Register";
import Login from "../Login/Login";
import StylesProvider from "@material-ui/styles/StylesProvider";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { AuthContext } from "../../hoc/AuthProvider/AuthProvider";

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
      <div className={classes.LP__Background}>
        <div className={classes.LP__PageWraper}>
          <div className={classes.LP__TopBar}>
            <img src={Logo} className={classes.LP__Logo_Img} alt="Logo" />
            <h4 className={classes.LP__Logo_Label}>localCoach</h4>
            <nav className={classes.LP__Navigation}>
              <span className={classes.LP__NavItem}>Home</span>
              <span className={classes.LP__NavItem}>Contact</span>
              <div className={classes.LP__Buttons}>
                <button
                  className={`${classes.LP__Button} ${classes.LP__Button_SignUp} `}
                  onClick={() => this.handleModalOpen("signUpOpen")}
                >
                  sign up
                </button>
                <button
                  className={`${classes.LP__Button} ${classes.LP__Button_Login} `}
                  onClick={() => this.handleModalOpen("loginOpen")}
                >
                  login
                </button>
              </div>
            </nav>
          </div>
          <div className={classes.LP__Description}>
            <h2 className={classes.LP__DescriptionTitle}>football</h2>
            <h3 className={classes.LP__DescriptionSubtitle}>team - manager</h3>
            <p className={classes.LP__DescriptionText}>
              Manage your football teams online. Gather all information about
              teams, players and trainings <br /> in one place!
            </p>
          </div>
        </div>
        <StylesProvider injectFirst>
          <Modal open={this.state.signUpOpen} onClose={this.handleModalClose}>
            <DialogContent className={classes.LP__Modal}>
              <Register />
            </DialogContent>
          </Modal>
          <Modal open={this.state.loginOpen} onClose={this.handleModalClose}>
            <DialogContent className={classes.LP__Modal}>
              <AuthContext.Consumer>
                {(props) => <Login {...props} />}
              </AuthContext.Consumer>
            </DialogContent>
          </Modal>
        </StylesProvider>
      </div>
    );
  }
}

export default Outside;
