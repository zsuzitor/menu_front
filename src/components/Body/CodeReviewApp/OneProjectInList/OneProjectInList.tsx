import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';


require('./OneProjectInList.css');


export interface IOneProjectInListProps {
    Project: IOneProjectInListDataBack;//todo временно так
    SetCurrentProject: (projectId: number) => void;
    CurrentProject: boolean;

}



const OneProjectInList = (props: IOneProjectInListProps) => {
    let projectClassName = 'review-project';
    if (props.CurrentProject) {
        projectClassName += ' selected-review-project'
    }


    return <div key={props.Project.Id.toString()} className={projectClassName}>
        <div onClick={() => props.SetCurrentProject(props.Project.Id)} title={props.Project.Name}>
            {props.Project.Name}
        </div>
    </div>

}




export default OneProjectInList;