

import React, { useState, useEffect } from 'react';
import { IProjectTaskDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';





export interface OneReviewTaskProps {
    Task: IProjectTaskDataBack;
    ProjectUsers: IProjectUserDataBack[];
}



const OneReviewTask = (props: OneReviewTaskProps) => {

    let creator = props.ProjectUsers.find(x => x.Id == props.Task.CreatorId);
    let reviwer = props.ProjectUsers.find(x => x.Id == props.Task.ReviewerId);

    return <div>
        <p>{props.Task.Id}</p>
        <h3>{props.Task.Name}</h3>
        <p>Создатель: {creator?.Name}</p>
        <p>Ревьювер: {reviwer?.Name || 'не назначен'}</p>
        <p>Статус: {props.Task.Status}</p>

    </div>
}




export default OneReviewTask;