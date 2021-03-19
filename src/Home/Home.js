import React, { Component } from 'react';
import classes from './Home.module.css';
import Logo from '../assets/img/logo.png';
import Register from './Register';
import Login from './Login';
import ContactCard from './ContactCard';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Facebook, MailOutline, PhoneAndroid } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import { AuthContext } from '../shared/AuthProvider/AuthProvider';
import backgroundMobile from '../assets/img/background-mobile.png';

class Home extends Component {
  state = {
    signUpOpen: false,
    loginOpen: false,
    contactOpen: false,
  };

  handleModalOpen = (modal) => {
    this.setState({ [modal]: true });
  };

  handleModalClose = () => {
    this.setState({ signUpOpen: false, loginOpen: false, contactOpen: false });
  };

  render() {
    return (
      <div className={classes.LP}>
        <div className={classes.LP__TopBar}>
          <img src={Logo} className={classes.LP__Logo_Img} alt="Logo" />
          <h4 className={classes.LP__Logo_Label}>localCoach</h4>
          <nav className={classes.LP__Navigation}>
            <span
              className={classes.LP__NavItem}
              onClick={() => window.location.reload()}
            >
              Home
            </span>
            <span
              className={classes.LP__NavItem}
              onClick={() => this.handleModalOpen('contactOpen')}
            >
              Contact
            </span>
            <Modal
              open={this.state.contactOpen}
              onClose={this.handleModalClose}
            >
              <DialogContent className={classes.LP__Modal}>
                <ContactCard />
              </DialogContent>
            </Modal>
            <div className={classes.LP__Buttons}>
              <button
                className={`${classes.LP__Button} ${classes.LP__Button_SignUp} `}
                onClick={() => this.handleModalOpen('signUpOpen')}
              >
                sign up
              </button>
              <button
                className={`${classes.LP__Button} ${classes.LP__Button_Login} `}
                onClick={() => this.handleModalOpen('loginOpen')}
              >
                login
              </button>
            </div>
          </nav>
        </div>
        <div className={classes.LP__PageWraper}>
          <div className={classes.LP__Description}>
            <h2 className={classes.LP__DescriptionTitle}>football</h2>
            <h3 className={classes.LP__DescriptionSubtitle}>team - manager</h3>
            <p className={classes.LP__DescriptionText}>
              Manage your football teams online. Gather all information about
              teams, players and trainings <br /> in one place!
            </p>
          </div>
          <div className={classes.LP__PagerWraper__Overlay_Mobile}></div>
          <img
            className={classes.LP__Image_Mobile}
            src={backgroundMobile}
            alt="logo"
          />
        </div>
        <div className={classes.LP__FormButtons}>
          <div className={classes.LP__FormButtonGroup}>
            <span className={classes.LP__FormButtonLabel}>
              Already have an account?
            </span>
            <button
              className={`${classes.LP__FormButton} ${classes.LP__FormButton_SignIn}`}
              onClick={() => this.handleModalOpen('loginOpen')}
            >
              Sign In
            </button>
          </div>
          <div className={classes.LP__FormButtonGroup}>
            <span className={classes.LP__FormButtonLabel}> no account? </span>
            <button
              className={`${classes.LP__FormButton} ${classes.LP__FormButton_SignUp}`}
              onClick={() => this.handleModalOpen('signUpOpen')}
            >
              Sign Up
            </button>
          </div>
        </div>
        <footer className={classes.LP__Footer}>
          <div className={classes.LP__FooterItem}>
            <MailOutline />
            <span className={classes.LP__FooterItemText}>
              konefaljakub@gmail.com
            </span>
          </div>
          <div className={classes.LP__FooterItem}>
            <PhoneAndroid />
            <span className={classes.LP__FooterItemText}>662 310 901</span>
          </div>
          <div className={classes.LP__FooterItem}>
            <a
              className={classes.LP__FooterLink}
              href="https://www.facebook.com/profile.php?id=100003350222858"
            >
              <Facebook />
              <span className={classes.LP__FooterItemText}>Facebook</span>
            </a>
          </div>
        </footer>
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

export default Home;
