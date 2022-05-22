import React, { useState, useEffect } from 'react';
import { IProjectTaskDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';



require('./AddTask.css');




export interface IAddTaskProps {
    ProjectUsers: IProjectUserDataBack[];
    ReloadTasks: () => void;
    ProjectId: number;
}



const AddTask = (props: IAddTaskProps) => {

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskCreator, setNewTaskCreator] = useState(-1);//firstUser?.Id || 
    const [newTaskReviwer, setNewTaskReviwer] = useState(-1);

    useEffect(() => {
        if (newTaskCreator === -1) {
            let firstUser = props.ProjectUsers.find(() => true);
            setNewTaskCreator(firstUser?.Id || -1);

        }

        let reviwerExist = props.ProjectUsers.some((x) => x.Id === newTaskReviwer);
        if (!reviwerExist) {
            setNewTaskReviwer(-1);
        }

    }, [props.ProjectUsers.length]);




    const createNewTask = () => {
        let addTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                // props.AddUserToProject(data);
                // addTaskToProject(data);
                props.ReloadTasks();
                
            }
        };

        window.G_CodeReviewTaskController.AddTaskToProject(newTaskName, newTaskCreator, newTaskReviwer, props.ProjectId, addTask);
        setNewTaskName('');
    };


    return <div>
        <textarea className='form-control-b persent-100-width' onChange={(e) => setNewTaskName(e.target.value)}
            value={newTaskName} placeholder='название'></textarea>
        <label>creator:</label>
        <select className='form-control-b' value={newTaskCreator} onChange={(e) => setNewTaskCreator(+e.target.value)}>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />
        <label>reviewer:</label>
        <select className='form-control-b' value={newTaskReviwer} onChange={(e) => setNewTaskReviwer(+e.target.value)}>
            <option value={-1}>Не выбрано</option>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />
        <button className='btn-b btn-border create-new-task-btn' onClick={() => createNewTask()}>Создать</button>
    </div>
}




export default AddTask;