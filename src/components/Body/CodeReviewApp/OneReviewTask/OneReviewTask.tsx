

import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../_ComponentsLink/BackModel/BoolResultBack';
import { IProjectTaskDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';



require('./OneReviewTask.css');


export interface OneReviewTaskProps {
    Task: IProjectTaskDataBack;
    ProjectUsers: IProjectUserDataBack[];
    UpdateTask: (task: IProjectTaskDataBack) => void;
}



const OneReviewTask = (props: OneReviewTaskProps) => {


    const [taskName, setTaskName] = useState(props.Task.Name);
    const [taskStatus, setTaskStatus] = useState(props.Task.Status);
    const [taskReviwer, setTaskReviwer] = useState(props.Task.ReviewerId || -1);
    const [taskCreator, setTaskCreator] = useState(props.Task.CreatorId);



    useEffect(() => {
        setTaskName(props.Task.Name);
    }, [props.Task.Name]);

    useEffect(() => {
        setTaskStatus(props.Task.Status);
    }, [props.Task.Status]);

    useEffect(() => {
        setTaskReviwer(props.Task.ReviewerId);
    }, [props.Task.ReviewerId]);

    useEffect(() => {
        setTaskCreator(props.Task.CreatorId);
    }, [props.Task.CreatorId]);


    // let creator = props.ProjectUsers.find(x => x.Id == props.Task.CreatorId);
    // let reviwer = props.ProjectUsers.find(x => x.Id == props.Task.ReviewerId);


    const cancelTask = () => {
        setTaskName(props.Task.Name);
        setTaskStatus(props.Task.Status);
        setTaskReviwer(props.Task.ReviewerId);
        setTaskCreator(props.Task.CreatorId);
    };

    const updateTask = () => {

        let forAdd = { ...props.Task };
                forAdd.Name = taskName;
                forAdd.Status = taskStatus;
                forAdd.ReviewerId = taskReviwer;
                forAdd.CreatorId = taskCreator;

        let updateTask = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.UpdateTask(forAdd);
            }
        };

        window.G_CodeReviewController.UpdateTask(forAdd, updateTask);
    };


    return <div className='one-review-task-block'>
        <p>{props.Task.Id}</p>
        <input type='text' value={taskName} onChange={e => setTaskName(e.target.value)}></input>
        <select value={taskCreator} onChange={(e) => setTaskCreator(+e.target.value)}>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <select value={taskReviwer} onChange={(e) => setTaskReviwer(+e.target.value)}>
            <option value={-1}>Не выбрано</option>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <select onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
            <option value={0}>Необходимо код ревью</option>
            <option value={1}>Необходимы правки</option>
            <option value={2}>Готово</option>
        </select>
        <button onClick={() => updateTask()}>Обновить</button>
        <button onClick={() => cancelTask()}>Отменить</button>

    </div>
}




export default OneReviewTask;