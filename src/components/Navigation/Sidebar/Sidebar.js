import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink, withRouter } from "react-router-dom";
import {
  AssignmentOutlined,
  PeopleOutline,
  DashboardOutlined,
} from "@material-ui/icons";

const Sidebar = ({ location }) => {
  const { pathname } = location;
  const toolbarTabs =
    pathname !== "/my-teams" && pathname !== "/my-teams/" ? (
      <div className={classes.Sidebar}>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${location.teamId}`,
            teamId: location.teamId,
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <DashboardOutlined className={classes.Sidebar__Icon} /> Dashboard
        </NavLink>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${location.teamId}/players`,
            teamId: location.teamId,
            teamName: location.teamName,
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <PeopleOutline className={classes.Sidebar__Icon} /> Players
        </NavLink>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${location.teamId}/trainings`,
            teamId: location.teamId,
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <AssignmentOutlined className={classes.Sidebar__Icon} /> Trainings
        </NavLink>
      </div>
    ) : null;

  return <>{toolbarTabs}</>;
};

export default withRouter(Sidebar);
