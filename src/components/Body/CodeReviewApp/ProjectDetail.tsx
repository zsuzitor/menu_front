import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';

import { IAuthState } from "../../_ComponentsLink/Models/AuthState";




export interface IProjectDetailProps {
    Project: IOneProjectInListDataBack;//todo временно так
}



const ProjectDetail = (props: IProjectDetailProps) => {
    const [newUserName, setNewUserName] = useState('');
    const [newTaskName, setNewTaskName] = useState('');



    const addNewUser = () => {
        //todo
    }



    if (!props.Project) {
        return <div>
            <p>выберите проект</p>
        </div>
    }


    return <div>
        <div>
            <h1>название: {props.Project.Name}</h1>
            <p>id: {props.Project.Id}</p>
            <input type='text' placeholder='email или имя человека'
                onChange={(e) => setNewUserName(e.target.value)} value={newUserName}></input>
            <button onClick={() => addNewUser()}>Добавить человека</button>

            <p>добавить задачу</p>
            <div>
                <input type='text' onChange={(e) => setNewTaskName(e.target.value)} value={newTaskName}></input>
                <select>
                    <option>Creator1</option>
                    <option>Creator2</option>
                </select>
                <select>
                    <option>Reviewer1</option>
                    <option>Reviewer2</option>
                </select>
                <button>Создать</button>
            </div>
        </div>
        <div>
            <div>фильтры</div>
            <select>
                <option>Creator1</option>
                <option>Creator2</option>
            </select>
            <select>
                <option>Reviewer1</option>
                <option>Reviewer2</option>
            </select>
            <select>
                <option>Status1</option>
                <option>Status2</option>
            </select>
        </div>
        <div>
            список задач
        </div>
    </div>
}




export default ProjectDetail;