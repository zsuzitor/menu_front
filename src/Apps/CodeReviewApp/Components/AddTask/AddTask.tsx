import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AlertData } from '../../../../Models/Models/AlertData';
import { IAuthState } from "../../../../Models/Models/AuthState";
import { AppState } from '../../../../Models/Models/State/AppState';
import { ProjectUser } from '../../Models/Entity/State/ProjectUser';
import { OneTask } from '../../Models/Entity/State/OneTask';



require('./AddTask.css');







interface IAddTaskOwnProps {
    ProjectUsers: ProjectUser[];
    ProjectId: number;
}


interface IAddTaskStateToProps {
    Auth: IAuthState;
}

interface IAddTaskDispatchToProps {
    AddTaskToProject: (task: OneTask, projectId: number) => void;
}

interface IAddTaskProps extends IAddTaskStateToProps, IAddTaskOwnProps, IAddTaskDispatchToProps {
}


const AddTask = (props: IAddTaskProps) => {

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskLink, setNewTaskLink] = useState('');
    let currentUser = props.ProjectUsers.find(x => x.MainAppUserId === props.Auth.User?.Id);
    const [newTaskCreator, setNewTaskCreator] = useState(currentUser?.Id || -1); 
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
        if (!newTaskName) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите название");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        let tsk = new OneTask()
        tsk.Name = newTaskName;
        tsk.CreatorId = newTaskCreator;
        tsk.ReviewerId = newTaskReviwer;
        tsk.Link = newTaskLink;
        props.AddTaskToProject(tsk, props.ProjectId);
        setNewTaskName('');
        setNewTaskLink('');
    };


    return <div>
        <textarea className='form-control-b persent-100-width' onChange={(e) => setNewTaskName(e.target.value)}
            value={newTaskName} placeholder='Название'></textarea>
        <input type='text'
            className='form-control-b persent-100-width'
            onChange={(e) => setNewTaskLink(e.target.value)}
            value={newTaskLink} placeholder='Ссылка'></input>
        <label>Автор:</label>
        <select className='form-control-b' value={newTaskCreator} onChange={(e) => setNewTaskCreator(+e.target.value)}>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />
        <label>Ревьювер:</label>
        <select className='form-control-b' value={newTaskReviwer} onChange={(e) => setNewTaskReviwer(+e.target.value)}>
            <option value={-1}>Не выбрано</option>
            {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
        </select>
        <br />
        <button className='btn-b btn-border create-new-task-btn' onClick={() => createNewTask()}>Создать</button>
    </div>
}



const mapStateToProps = (state: AppState, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskStateToProps;
    res.Auth = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskDispatchToProps;
    res.AddTaskToProject = (task: OneTask, projectId: number) => {
        dispatch(window.G_CodeReviewTaskController.AddTaskToProjectRedux(task, projectId));
    };

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(AddTask);