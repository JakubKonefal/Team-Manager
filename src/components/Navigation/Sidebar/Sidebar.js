import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink, withRouter } from "react-router-dom";
import {
  AssignmentOutlined,
  GroupOutlined,
  PersonOutline,
  DashboardOutlined,
} from "@material-ui/icons";

const Sidebar = ({ match: { params, path } }) => {
  const { teamId, teamName } = params;
  const toolbarTabs =
    path !== "/my-teams" && path !== "/my-teams/" ? (
      <div className={classes.Sidebar}>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${teamId}/${teamName}`,
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <DashboardOutlined className={classes.Sidebar__Icon} /> Dashboard
        </NavLink>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: "/my-teams",
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <GroupOutlined className={classes.Sidebar__Icon} /> Teams
        </NavLink>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${teamId}/${teamName}/players`,
          }}
          activeClassName={classes.Sidebar__Link_Active}
        >
          <PersonOutline className={classes.Sidebar__Icon} /> Players
        </NavLink>
        <NavLink
          exact
          className={classes.Sidebar__Link}
          to={{
            pathname: `/my-teams/${teamId}/${teamName}/trainings`,
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
