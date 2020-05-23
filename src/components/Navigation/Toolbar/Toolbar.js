import React, { useContext } from "react";
import classes from "./Toolbar.module.css";
import { withRouter } from "react-router-dom";
import ToolbarItems from "./ToolbarItems/ToolbarItems";
import { AuthContext } from "../../../hoc/AuthProvider/AuthProvider";

const Toolbar = () => {
  const { currentUserEmail } = useContext(AuthContext);

  return (
    <>
      <div className={classes.Toolbar}>
        <ToolbarItems email={currentUserEmail} />
      </div>
    </>
  );
};

export default withRouter(Toolbar);
