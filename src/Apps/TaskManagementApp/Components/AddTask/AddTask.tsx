import React, { useState, useEffect } from 'react';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { OneTask } from '../../Models/Entity/State/OneTask';
import connectToStore, { IAddTaskProps } from './AddTaskSetup';



require('./AddTask.css');




const AddTask = (props: IAddTaskProps) => {

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    let currentUser = props.ProjectUsers.find(x => x.MainAppUserId === props.Auth.User?.Id);
    const [newTaskCreator, setNewTaskCreator] = useState(currentUser?.Id || -1);
    const [newTaskReviwer, setNewTaskReviwer] = useState(-1);
    const [taskStatus, setTaskStatus] = useState(-1);

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
        if (!newTaskName) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите название");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        if (!taskStatus || taskStatus == -1) {

            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите статус");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        let tsk = new OneTask()
        tsk.Name = newTaskName;
        tsk.CreatorId = newTaskCreator;
        tsk.ExecutorId = newTaskReviwer;
        tsk.Description = newTaskDescription;
        tsk.StatusId = taskStatus;
        props.AddTaskToProject(tsk, props.ProjectId);
        setNewTaskName('');
        setNewTaskDescription('');
    };


    return <div>
        <input type='text' className='form-control-b persent-100-width' onChange={(e) => setNewTaskName(e.target.value)}
            value={newTaskName} placeholder='Название'></input>
        <textarea
            className='form-control-b persent-100-width'
            onChange={(e) => setNewTaskDescription(e.target.value)}
            value={newTaskDescription} placeholder='Описание'></textarea>
        <label>Автор:</label>
        <select className='form-control-b' value={newTaskCreator} onChange={(e) => setNewTaskCreator(+e.target.value)}>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />
        <label>Исполнитель:</label>
        <select className='form-control-b' value={newTaskReviwer} onChange={(e) => setNewTaskReviwer(+e.target.value)}>
            <option value={-1}>Не выбрано</option>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />

        <span>Статус</span>
        <select className='form-select'
            onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
            <option value={-1}>Не выбрано</option>
            {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
        </select>
        <br />
        <button className='btn-b btn-border create-new-task-btn' onClick={() => createNewTask()}>Создать</button>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddTask);