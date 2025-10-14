import React, { useState, useEffect } from 'react';
import connectToStore, { IOneProjectInListProps } from './OneProjectInListSetup';

import { useNavigate } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';

require('./OneProjectInList.css');



const OneProjectInList = (props: IOneProjectInListProps) => {


    const navigate = useNavigate();


    let projectClassName = 'management-project';

    if (props.CurrentProject) {
        projectClassName += ' selected-management-project'
    }

    const projectUrl = new RouteBuilder().ProjectUrl(props.Project.Id);
    return <div key={props.Project.Id.toString()}
        className={projectClassName}
    >
        <a href={projectUrl} onClick={(e) => {
            e.preventDefault();
            navigate(projectUrl);
        }}>{props.Project.Name}</a>
    </div>

}






// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectInList);