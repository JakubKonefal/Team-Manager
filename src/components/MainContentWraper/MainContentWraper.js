import React from 'react';
import classes from './MainContentWraper.module.css';

 const MainContentWraper = (props) => {
    return (
        <div className={classes.MainContentWraper}>
                {props.children}
        </div>
    )
}

export default MainContentWraper;
