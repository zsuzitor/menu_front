import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IProjectTaskDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { AppState } from '../../../../Models/Models/State/AppState';



require('./AddTask.css');







interface IAddTaskOwnProps {
    ProjectUsers: IProjectUserDataBack[];
    ProjectId: number;


}


interface IAddTaskStateToProps {

}

interface IAddTaskDispatchToProps {
    AddTaskToProject: (newTaskName: string, newTaskCreator: number, newTaskReviwer: number, projectId: number) => void;

}

interface IAddTaskProps extends IAddTaskStateToProps, IAddTaskOwnProps, IAddTaskDispatchToProps {
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
        if (!newTaskName) {
            alert('Введите название');
        }

        // let addTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data) {
        //         // props.AddUserToProject(data);
        //         // addTaskToProject(data);
        //         props.ReloadTasks();

        //     }
        // };

        // window.G_CodeReviewTaskController.AddTaskToProjectRedux(newTaskName, newTaskCreator, newTaskReviwer, props.ProjectId);
        props.AddTaskToProject(newTaskName, newTaskCreator, newTaskReviwer, props.ProjectId);
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





const mapStateToProps = (state: AppState, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskDispatchToProps;
    res.AddTaskToProject = (newTaskName: string, newTaskCreator: number, newTaskReviwer: number, projectId: number) => {
        dispatch(window.G_CodeReviewTaskController.AddTaskToProjectRedux(newTaskName, newTaskCreator, newTaskReviwer, projectId));
    };

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(AddTask);