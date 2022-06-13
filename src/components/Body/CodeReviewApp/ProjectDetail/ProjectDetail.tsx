import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { IOneProjectInListDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectTaskDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';

import { IAuthState } from "../../../../Models/Models/AuthState";
import OneProjectUser from '../OneProjectUser/OneProjectUser';
import OneReviewTask from '../OneReviewTask/OneReviewTask';
import cloneDeep from 'lodash/cloneDeep';
import { ITaskFilter } from '../../../../Models/Models/CodeReviewApp/TasksFilter';
import { ILoadReviewTasksResultDataBask } from '../../../../Models/BackModel/CodeReviewApp/ILoadReviewTasksResultDataBask';
import Paggination from '../Paggination/Paggination';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import ProjectUsers from '../ProjectUsers/ProjectUsers';
import AddTask from '../AddTask/AddTask';



require('./ProjectDetail.css');

export interface IProjectDetailProps {
    AuthInfo: IAuthState;
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
    const tasksOnPageCount = 5;


    const [currentProjectTasks, setCurrentProjectTasks] = useState([] as IProjectTaskDataBack[]);
    const [allTasksCount, setAllTasksCount] = useState(0);





    const [filterTaskCreator, setFilterTaskCreator] = useState(-1);
    const [filterTaskReviwer, setFilterTaskReviwer] = useState(-1);
    const [filterTaskStatus, setFilterTaskStatus] = useState(-1);
    const [filterTaskName, setFilterTaskName] = useState('');
    const [filterTaskPage, setFilterTaskPage] = useState(1);
    const [loadTasksTimerId, setLoadTasksTimerId] = useState(null);


    const [showUserList, setShowUserList] = useState(false);
    const [showAddNewTaskForm, setShowAddNewTaskForm] = useState(false);



    useEffect(() => {

        let filterCreatorExist = props.ProjectUsers.some((x) => x.Id === filterTaskCreator);
        if (!filterCreatorExist) {
            setFilterTaskCreator(-1);
        }

        let filterReviwerExist = props.ProjectUsers.some((x) => x.Id === filterTaskReviwer);
        if (!filterReviwerExist) {
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
        let loadTasks = (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBask) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setCurrentProjectTasks(data.Tasks);
                setAllTasksCount(data.TasksCount);
            }
        };

        let filter = {
            Name: filterTaskName, CreatorId: filterTaskCreator
            , PageNumber: filterTaskPage, PageSize: tasksOnPageCount
            , ProjectId: props.Project.Id, ReviewerId: filterTaskReviwer
            , Status: filterTaskStatus
        } as ITaskFilter;


        window.G_CodeReviewTaskController.LoadTasks(filter, loadTasks);
    }





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

        window.G_CodeReviewProjectController.DeleteProject(props.Project.Id, deleteProject);
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


    let userListClass = ' display_none';
    if (showUserList) {
        userListClass = '';//' project-review-user-list-show'
    }


    return <div className='review-project-detail-main'>
        <div>
            <h1>название: {props.Project.Name}</h1>
            <span>id: {props.Project.Id}</span>
            <div className='review-project-delete-button' onClick={() => {
                if (confirm('удалить проект?')) {
                    deleteProject();
                }
            }}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='удалить задачу' />
            </div>
            <br />

            <button className='btn-b btn-border' onClick={() => setShowUserList(e => true)}>Люди проекта</button>
            {showUserList ? <AdditionalWindow CloseWindow={() => setShowUserList(false)}
                IsHeightWindow={true}
                Title='Люди проекта'
                InnerContent={() => <ProjectUsers
                    AddUserToProject={props.AddUserToProject}
                    ChangeUser={props.ChangeUser}
                    DeleteUser={props.DeleteUser}
                    ProjectId={props.Project.Id}
                    ProjectUsers={props.ProjectUsers}></ProjectUsers>}></AdditionalWindow> : <></>}


            <br />

            <div className='review-project-new-task-block'>
                <button className='btn-b btn-border' onClick={() => setShowAddNewTaskForm(true)}>Добавить задачу</button>
                {showAddNewTaskForm ? <AdditionalWindow CloseWindow={() => setShowAddNewTaskForm(false)}
                    IsHeightWindow={false}
                    Title='Добавление задачи'
                    InnerContent={() => <AddTask
                        ProjectId={props.Project.Id}
                        ProjectUsers={props.ProjectUsers}
                        ReloadTasks={reloadTasks}
                    ></AddTask>}></AdditionalWindow> : <></>}

            </div>
        </div>
        <div className='review-project-tasks-filters-block'>
            <div>фильтры</div>
            <input className='form-control-b' type='text' value={filterTaskName}
                onChange={e => setFilterTaskName(e.target.value)} placeholder='название'></input>
            <span>Создатель</span>
            <select className='form-control-b' value={filterTaskCreator} onChange={(e) => setFilterTaskCreator(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <span>Ревьювер</span>
            <select className='form-control-b' value={filterTaskReviwer} onChange={(e) => setFilterTaskReviwer(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <span>Статус</span>
            <select className='form-control-b' onChange={e => setFilterTaskStatus(+e.target.value)} value={filterTaskStatus}>
                <option value={-1}>Любой</option>
                <option value={0}>Необходимо код ревью</option>
                <option value={1}>Необходимы правки</option>
                <option value={2}>Готово</option>
            </select>
            <div>
                <Paggination
                    ElementsCount={allTasksCount}
                    PageNumber={filterTaskPage}
                    ElementsOnPage={tasksOnPageCount}
                    SetPageNumber={setFilterTaskPage}></Paggination>
            </div>
        </div>
        <div>
            <h2>список задач</h2>
            {currentProjectTasks.map(x => <OneReviewTask key={x.Id}
                AuthInfo={props.AuthInfo}
                Task={x}
                ProjectUsers={props.ProjectUsers}
                UpdateTask={updateTaskProject}
                DeleteTask={deleteTask}
            ></OneReviewTask>)}

        </div>
    </div>
}




export default ProjectDetail;