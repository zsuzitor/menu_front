import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectTaskDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';

import { IAuthState } from "../../_ComponentsLink/Models/AuthState";




export interface IProjectDetailProps {
    Project: IOneProjectInListDataBack;//todo временно так
    ProjectUsers: IProjectUserDataBack[];
    ProjectTasks: IProjectTaskDataBack[];
    AddUserToProject: (user: IProjectUserDataBack) => void;
    AddTaskToProject: (task: IProjectTaskDataBack) => void;

}



const ProjectDetail = (props: IProjectDetailProps) => {
    const [newUserName, setNewUserName] = useState('');

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskCreator, setNewTaskCreator] = useState(-1);
    const [newTaskReviwer, setNewTaskReviwer] = useState(-1);



    const addNewUser = () => {
        //todo
        let addUser = (error: MainErrorObjectBack, data: IProjectUserDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                props.AddUserToProject(data);
            }
        };

        window.G_CodeReviewController.AddUserToProject(newUserName, props.Project.Id, addUser);
        setNewUserName('');
    };


    const createNewTask = () => {
        let addTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                // props.AddUserToProject(data);
                props.AddTaskToProject(data);
                setNewTaskName('');
            }


        };

        window.G_CodeReviewController.AddTaskToProject(newTaskName, newTaskCreator, newTaskReviwer, props.Project.Id, addTask);
    };


    if (!props.Project) {
        return <div>
            <p>выберите проект</p>
        </div>
    }


    return <div>
        <div>
            <h1>название: {props.Project.Name}</h1>
            <p>id: {props.Project.Id}</p>
            <input type='text' placeholder='имя человека'
                onChange={(e) => setNewUserName(e.target.value)} value={newUserName}></input>
            <button onClick={() => addNewUser()}>Добавить человека</button>

            <p>добавить задачу</p>
            <div>
                <input type='text' onChange={(e) => setNewTaskName(e.target.value)} value={newTaskName}></input>
                <label>creator:</label>
                <select value={newTaskCreator} onChange={(e) => setNewTaskCreator(+e.target.value)}>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <label>reviewer:</label>
                <select value={newTaskReviwer} onChange={(e) => setNewTaskReviwer(+e.target.value)}>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <button onClick={() => createNewTask()}>Создать</button>
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