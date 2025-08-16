import React, { useState, useEffect } from 'react';
import connectToStore, { IOneProjectInListProps } from './OneProjectInListSetup';

import { useNavigate } from 'react-router-dom';

require('./OneProjectInList.css');



const OneProjectInList = (props: IOneProjectInListProps) => {


    const navigate = useNavigate();


    let projectClassName = 'management-project';

    if (props.CurrentProject) {
        projectClassName += ' selected-management-project'
    }


    return <div key={props.Project.Id.toString()}
        className={projectClassName}
    >
        <a href={'/task-management/proj-' + props.Project.Id} onClick={(e) => {
            e.preventDefault();
            navigate("/task-management/proj-" + props.Project.Id);
        }}>{props.Project.Name}</a>
    </div>

}






// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectInList);