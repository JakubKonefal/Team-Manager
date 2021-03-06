import React, { useContext } from "react";
import classes from "./Toolbar.module.css";
import { withRouter } from "react-router-dom";
import ToolbarItems from "./ToolbarItems";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Toolbar = () => {
  const { currentUserEmail, currentUid } = useContext(AuthContext);

  return (
    <div className={classes.Toolbar}>
      <ToolbarItems email={currentUserEmail} userId={currentUid} />
    </div>
  );
};

export default withRouter(Toolbar);
