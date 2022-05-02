import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';

import { IAuthState } from "../../_ComponentsLink/Models/AuthState";




export interface IProjectDetailProps {
    Project: IOneProjectInListDataBack;//todo временно так
}



const ProjectDetail = (props: IProjectDetailProps) => {


    if (!props.Project) {
        return <div>
            <p>выберите проект</p>
        </div>
    }


    return <div>
        <div>
            <p>название: {props.Project.Name}</p>
            <p>id: {props.Project.Id}</p>
            <p>добавить человека</p>
            <p>добавить задачу</p>
        </div>
        <div>
            <div>фильтры</div>

        </div>
    </div>
}




export default ProjectDetail;