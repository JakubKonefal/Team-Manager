import React, { useContext, useState, useEffect } from "react";
import classes from "./Toolbar.module.css";
import { Link, withRouter } from "react-router-dom";
import ToolbarItems from "./ToolbarItems/ToolbarItems";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StylesProvider from "@material-ui/styles/StylesProvider";
import { AuthContext } from "../../../hoc/AuthProvider/AuthProvider";

const Toolbar = ({ location }) => {
  const [tabValue, setTabValue] = useState(0);
  const { currentUserEmail } = useContext(AuthContext);

  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const { pathname } = location;
  const toolbarTabs =
    pathname !== "/my-teams" && pathname !== "/my-teams/" ? (
      <StylesProvider injectFirst>
        <AppBar className={classes.Toolbar__TabsBar} position="static">
          <Tabs
            className={classes.Toolbar__Tabs}
            indicatorColor="primary"
            value={tabValue}
            onChange={handleChange}
          >
            <Link
              className={classes.Toolbar__Link}
              to={{
                pathname: `/my-teams/${location.teamId}/players`,
                teamId: location.teamId,
                teamName: location.teamName,
              }}
            >
              <Tab className={classes.Toolbar__Tab} label="Players" />
            </Link>
            <Link
              className={classes.Toolbar__Link}
              to={{
                pathname: `/my-teams/${location.teamId}/trainings`,
                teamId: location.teamId,
              }}
            >
              <Tab className={classes.Toolbar__Tab} label="Trainings" />
            </Link>
          </Tabs>
        </AppBar>
      </StylesProvider>
    ) : null;

  return (
    <>
      <div className={classes.Toolbar}>
        <ToolbarItems email={currentUserEmail} />
      </div>
      {toolbarTabs}
    </>
  );
};

export default withRouter(Toolbar);
