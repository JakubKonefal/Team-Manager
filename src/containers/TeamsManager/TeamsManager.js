import React from "react";
import classes from "./TeamsManager.module.css";
import "../../assets/webfonts/all.css";
import MainContentWraper from "../../components/MainContentWraper/MainContentWraper";
import Teams from "../../components/Inside/TeamsManager/Teams/Teams";
import Layout from "../../hoc/Layout/Layout";
import Footer from "../../components/Navigation/Footer/Footer";

const TeamsManager = ({ userId, email }) => {
  return (
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
};

export default TeamsManager;
