import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ToolbarItem.module.css';

const toolbarItem = (props) =>{
    return(
        <NavLink
         to={props.link}
         className={classes.ToolbarItem}>{props.children}</NavLink>
    );
}

 export default toolbarItem;