import React from 'react';
// import { NavLink } from 'react-router-dom';
import classes from './Topnav.module.css';

const topnav = () =>{
    return(
        <div className={classes.Topnav}>
            <span>Digital Football Manager</span>
            <div className={classes.BtnsWraper}>
                <button className={classes.Login} >Sign up</button>
                <button className={classes.Signup} >Log in</button>
            </div>
        </div>
    );
}

export default topnav;