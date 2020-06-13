import React from "react";
import classes from "./TeamsManager.module.css";
import "../assets/webfonts/all.css";
import MainContentWraper from "../shared/MainContentWraper/MainContentWraper";
import Teams from "./Teams";
import Layout from "../shared/Layout/Layout";
import Footer from "../shared/Footer/Footer";

const TeamsManager = ({ userId, email }) => (
  <Layout>
    <MainContentWraper email={email}>
      <div className={classes.TeamsManager}>
        <h1 className={classes.TeamsManager__Header}>your teams</h1>
        <ul className={classes.TeamsManager__TeamsList}>
          <Teams userId={userId} />
        </ul>
      </div>
    </MainContentWraper>
    <Footer />
  </Layout>
);

export default TeamsManager;
