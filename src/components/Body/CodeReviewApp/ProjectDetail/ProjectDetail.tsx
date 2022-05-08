import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../_ComponentsLink/BackModel/BoolResultBack';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectTaskDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';

import { IAuthState } from "../../../_ComponentsLink/Models/AuthState";
import OneProjectUser from '../OneProjectUser/OneProjectUser';
import OneReviewTask from '../OneReviewTask/OneReviewTask';
import cloneDeep from 'lodash/cloneDeep';
import { ITaskFilter } from '../../../_ComponentsLink/Models/CodeReviewApp/TasksFilter';



require('./ProjectDetail.css');

export interface IProjectDetailProps {
    Project: IOneProjectInListDataBack;//todo временно так
    ProjectUsers: IProjectUserDataBack[];
    // ProjectTasks: IProjectTaskDataBack[];
    AddUserToProject: (user: IProjectUserDataBack) => void;
    // AddTaskToProject: (task: IProjectTaskDataBack) => void;
    DeleteProject: () => void;
    ChangeUser: (user: IProjectUserDataBack) => void;
    DeleteUser: (id: number) => void;
    // UpdateTask: (task: IProjectTaskDataBack) => void;

}



const ProjectDetail = (props: IProjectDetailProps) => {

    const [currentProjectTasks, setCurrentProjectTasks] = useState([] as IProjectTaskDataBack[]);


    const [newUserName, setNewUserName] = useState('');
    const [newTaskName, setNewTaskName] = useState('');

    const [newTaskCreator, setNewTaskCreator] = useState(-1);//firstUser?.Id || 
    const [newTaskReviwer, setNewTaskReviwer] = useState(-1);

    const [filterTaskCreator, setFilterTaskCreator] = useState(-1);
    const [filterTaskReviwer, setFilterTaskReviwer] = useState(-1);
    const [filterTaskStatus, setFilterTaskStatus] = useState(-1);
    const [filterTaskName, setFilterTaskName] = useState('');
    const [filterTaskPage, setFilterTaskPage] = useState(1);
    const [loadTasksTimerId, setLoadTasksTimerId] = useState(null);


    const [showUserList, setShowUserList] = useState(false);



    useEffect(() => {
        if (newTaskCreator === -1) {
            let firstUser = props.ProjectUsers.find(() => true);
            setNewTaskCreator(firstUser?.Id || -1);

        }

        let reviwerExist = props.ProjectUsers.some((x) => x.Id === newTaskReviwer);
        if (!reviwerExist) {
            setNewTaskReviwer(-1);
        }

        // let filterCreatorExist = props.ProjectUsers.some((x) => x.Id === filterTaskCreator);
        if (!reviwerExist) {
            setFilterTaskCreator(-1);
        }

        // let filterReviwerExist = props.ProjectUsers.some((x) => x.Id === filterTaskReviwer);
        if (!reviwerExist) {
            setFilterTaskReviwer(-1);
        }

    }, [props.ProjectUsers.length]);//[firstUser?.Id]);


    useEffect(() => {
        if (!props.Project?.Id) {
            return;
        }
        //todo тут нужно как то с setTimeout поиграть что бы не тригерить апи на каждый введенный сомвол
        if (loadTasksTimerId) {
            clearTimeout(loadTasksTimerId);
        }

        var timerId = setTimeout(() => {
            reloadTasks();
        }, 1500);

        setLoadTasksTimerId(timerId);


    }, [props.Project?.Id, filterTaskCreator, filterTaskReviwer, filterTaskStatus, filterTaskName, filterTaskPage]);



    const reloadTasks = () => {
        let loadTasks = (error: MainErrorObjectBack, data: IProjectTaskDataBack[]) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setCurrentProjectTasks(data);
            }
        };

        let filter = {
            Name: filterTaskName, CreatorId: filterTaskCreator
            , PageNumber: filterTaskPage, PageSize: 5
            , ProjectId: props.Project.Id, ReviewerId: filterTaskReviwer
            , Status: filterTaskStatus
        } as ITaskFilter;


        window.G_CodeReviewController.LoadTasks(filter, loadTasks);
    }



    const addNewUser = () => {
        if (!newUserName) {
            return;
        }

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
                // addTaskToProject(data);
                reloadTasks();
                setNewTaskName('');
            }
        };

        window.G_CodeReviewController.AddTaskToProject(newTaskName, newTaskCreator, newTaskReviwer, props.Project.Id, addTask);
    };

    const deleteProject = () => {
        let deleteProject = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.DeleteProject();
            }
        };

        window.G_CodeReviewController.DeleteProject(props.Project.Id, deleteProject);
    };


    // const addTaskToProject = (task: IProjectTaskDataBack) => {
    //     setCurrentProjectTasks(oldState => {
    //         return [...oldState, task];
    //     });
    // };

    const updateTaskProject = (task: IProjectTaskDataBack) => {
        setCurrentProjectTasks(oldState => {
            let newState = cloneDeep(oldState);
            var tsk = newState.find(x => x.Id == task.Id);
            tsk.Name = task.Name;
            tsk.Status = task.Status;
            tsk.ReviewerId = task.ReviewerId;
            tsk.CreatorId = task.CreatorId;

            return newState;
        });
    };

    const deleteTask = (id: number) => {
        setCurrentProjectTasks(oldState => {
            return oldState.filter(x => x.Id != id);
        });
    };



    if (!props.Project) {
        return <div style={{ paddingTop: '20px' }}>
            <p>выберите проект</p>
        </div>
    }


    let userListClass = ' height-0';
    if (showUserList) {
        userListClass = ' project-review-user-list-show'
    }


    return <div className='review-project-detail-main'>
        <div>
            <h1>название: {props.Project.Name}</h1>
            <p>id: {props.Project.Id}</p>
            <button onClick={() => {
                if (confirm('удалить проект?')) {
                    deleteProject();
                }
            }}>удалить проект</button>
            <br />
            <input type='text' placeholder='имя человека'
                onChange={(e) => setNewUserName(e.target.value)} value={newUserName}></input>
            <button onClick={() => addNewUser()}>Добавить человека</button>
            <button onClick={() => setShowUserList(e => !e)}>список людей проекта:</button>

            <div className={'project-review-user-list' + userListClass}>
                {props.ProjectUsers.map(x => {
                    return <OneProjectUser User={x}
                        key={x.Id} ChangeUser={props.ChangeUser}
                        DeleteUser={props.DeleteUser}></OneProjectUser>
                })}
            </div>


            <p>добавить задачу</p>
            <div>
                <input type='text' onChange={(e) => setNewTaskName(e.target.value)} value={newTaskName}></input>
                <label>creator:</label>
                <select value={newTaskCreator} onChange={(e) => setNewTaskCreator(+e.target.value)}>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <label>reviewer:</label>
                <select value={newTaskReviwer} onChange={(e) => setNewTaskReviwer(+e.target.value)}>
                    <option value={-1}>Не выбрано</option>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <button onClick={() => createNewTask()}>Создать</button>
            </div>
        </div>
        <div>
            <div>фильтры</div>
            <input type='text' value={filterTaskName} onChange={e => setFilterTaskName(e.target.value)}></input>
            <select value={filterTaskCreator} onChange={(e) => setFilterTaskCreator(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <select value={filterTaskReviwer} onChange={(e) => setFilterTaskReviwer(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <select onChange={e => setFilterTaskStatus(+e.target.value)} value={filterTaskStatus}>
                <option value={-1}>Любой</option>
                <option value={0}>Необходимо код ревью</option>
                <option value={1}>Необходимы правки</option>
                <option value={2}>Готово</option>
            </select>
        </div>
        <div>
            список задач
            {currentProjectTasks.map(x => <OneReviewTask key={x.Id}
                Task={x}
                ProjectUsers={props.ProjectUsers}
                UpdateTask={updateTaskProject}
                DeleteTask={deleteTask}
            ></OneReviewTask>)}

        </div>
    </div>
}




export default ProjectDetail;