import React from "react";
import classes from "./ContactCard.module.css";
import StylesProvider from "@material-ui/styles/StylesProvider";
import { Facebook, MailOutline, PhoneAndroid } from "@material-ui/icons";

const ContactCard = () => {
  return (
    <StylesProvider injectFirst>
      <div className={classes.ContactCard}>
        <a
          className={`${classes.ContactCard__FBLink} ${classes.ContactCard__Item}`}
          href="https://www.facebook.com/profile.php?id=100003350222858"
        >
          <Facebook className={classes.ContactCard__Icon} />
          <span className={classes.ContactCard__FBName}>Konefał Jakub</span>
        </a>
        <span className={classes.ContactCard__Item}>
          <MailOutline className={classes.ContactCard__Icon} />
          konefaljakub@gmail.com
        </span>
        <span className={classes.ContactCard__Item}>
          <PhoneAndroid className={classes.ContactCard__Icon} /> 662 310 901
        </span>
      </div>
    </StylesProvider>
  );
};

export default ContactCard;
