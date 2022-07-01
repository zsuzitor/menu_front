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
import { ILoadReviewTasksResultDataBack } from '../../../../Models/BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack';
import Paggination from '../Paggination/Paggination';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import ProjectUsers from '../ProjectUsers/ProjectUsers';
import AddTask from '../AddTask/AddTask';
import { TasksFilter } from '../../../../Models/Models/CodeReviewApp/State/TasksFilter';
import { OneTask } from '../../../../Models/Models/CodeReviewApp/State/OneTask';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { SetFilterTaskCreatorActionCreator, SetFilterTaskNameActionCreator, SetFilterTaskPageActionCreator, SetFilterTaskReviewerActionCreator, SetFilterTaskStatusActionCreator } from '../../../../Models/Actions/CodeReviewApp/TaskActions';



require('./ProjectDetail.css');



interface IProjectDetailOwnProps {
    AuthInfo: IAuthState;
    Project: IOneProjectInListDataBack;//todo временно так
    Tasks: OneTask[];
}


interface IProjectDetailStateToProps {
    ProjectUsers: IProjectUserDataBack[];
    TasksFilters: TasksFilter;

    CurrentProjectTasksAllCount: number;
}

interface IProjectDetailDispatchToProps {
    SetFilterTaskCreator: (id: number) => void;
    SetFilterTaskReviewer: (id: number) => void;
    SetFilterTaskName: (name: string) => void;
    SetFilterTaskPage: (num: number) => void;
    SetFilterTaskStatus: (status: number) => void;

    ReloadTasks: (filters: ITaskFilter) => void;

    // AddUserToProject: (user: IProjectUserDataBack) => void;
    // AddTaskToProject: (task: IProjectTaskDataBack) => void;
    DeleteProject: (id: number) => void;
    // ChangeUser: (user: IProjectUserDataBack) => void;
    // DeleteUser: (id: number) => void;
}

interface IProjectDetailProps extends IProjectDetailStateToProps, IProjectDetailOwnProps, IProjectDetailDispatchToProps {
}



const ProjectDetail = (props: IProjectDetailProps) => {
    const tasksOnPageCount = 5;


    // const [currentProjectTasks, setCurrentProjectTasks] = useState([] as IProjectTaskDataBack[]);
    // const [allTasksCount, setAllTasksCount] = useState(0);





    // const [filterTaskCreator, setFilterTaskCreator] = useState(-1);
    // const [filterTaskReviwer, setFilterTaskReviwer] = useState(-1);
    // const [filterTaskStatus, setFilterTaskStatus] = useState(-1);
    // const [filterTaskName, setFilterTaskName] = useState('');
    // const [filterTaskPage, setFilterTaskPage] = useState(1);
    const [loadTasksTimerId, setLoadTasksTimerId] = useState(null);


    const [showUserList, setShowUserList] = useState(false);
    const [showAddNewTaskForm, setShowAddNewTaskForm] = useState(false);



    useEffect(() => {

        let filterCreatorExist = props.ProjectUsers.some((x) => x.Id === props.TasksFilters.CreatorId);
        if (!filterCreatorExist) {
            props.SetFilterTaskCreator(-1);
        }

        let filterReviewerExist = props.ProjectUsers.some((x) => x.Id === props.TasksFilters.ReviewerId);
        if (!filterReviewerExist) {
            props.SetFilterTaskReviewer(-1);
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


    }, [props.Project?.Id, props.TasksFilters.CreatorId, props.TasksFilters.ReviewerId
        , props.TasksFilters.Status, props.TasksFilters.TaskName, props.TasksFilters.Page, props.TasksFilters.Retrigger]);



    const reloadTasks = () => {
        // let loadTasks = (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBask) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data) {
        //         setCurrentProjectTasks(data.Tasks);
        //         setAllTasksCount(data.TasksCount);
        //     }
        // };

        let filter = {
            Name: props.TasksFilters.TaskName, CreatorId: props.TasksFilters.CreatorId
            , PageNumber: props.TasksFilters.Page, PageSize: tasksOnPageCount
            , ProjectId: props.Project.Id, ReviewerId: props.TasksFilters.ReviewerId
            , Status: props.TasksFilters.Status
        } as ITaskFilter;


        // window.G_CodeReviewTaskController.LoadTasksRedux(filter, loadTasks);
        props.ReloadTasks(filter);
    }





    const deleteProject = () => {
        // let deleteProject = (error: MainErrorObjectBack, data: BoolResultBack) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data?.result) {
        //         props.DeleteProject();
        //     }
        // };

        // window.G_CodeReviewProjectController.DeleteProject(props.Project.Id, deleteProject);
        props.DeleteProject(props.Project.Id);
    };


    // const addTaskToProject = (task: IProjectTaskDataBack) => {
    //     setCurrentProjectTasks(oldState => {
    //         return [...oldState, task];
    //     });
    // };

    // const updateTaskProject = (task: IProjectTaskDataBack) => {
    //     setCurrentProjectTasks(oldState => {
    //         let newState = cloneDeep(oldState);
    //         var tsk = newState.find(x => x.Id == task.Id);
    //         tsk.Name = task.Name;
    //         tsk.Status = task.Status;
    //         tsk.ReviewerId = task.ReviewerId;
    //         tsk.CreatorId = task.CreatorId;

    //         return newState;
    //     });
    // };

    // const deleteTask = (id: number) => {
    //     setCurrentProjectTasks(oldState => {
    //         return oldState.filter(x => x.Id != id);
    //     });
    // };



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
                InnerContent={() => <ProjectUsers></ProjectUsers>}></AdditionalWindow> : <></>}


            <br />

            <div className='review-project-new-task-block'>
                <button className='btn-b btn-border' onClick={() => setShowAddNewTaskForm(true)}>Добавить задачу</button>
                {showAddNewTaskForm ? <AdditionalWindow CloseWindow={() => setShowAddNewTaskForm(false)}
                    IsHeightWindow={false}
                    Title='Добавление задачи'
                    InnerContent={() => <AddTask
                        ProjectId={props.Project.Id}
                        ProjectUsers={props.ProjectUsers.filter(us => !us.Deactivated)}
                    ></AddTask>}></AdditionalWindow> : <></>}

            </div>
        </div>
        <div className='review-project-tasks-filters-block'>
            <div>фильтры</div>
            <input className='form-control-b' type='text' value={props.TasksFilters.TaskName}
                onChange={e => props.SetFilterTaskName(e.target.value)} placeholder='название'></input>
            <span>Создатель</span>
            <select className='form-control-b' value={props.TasksFilters.CreatorId} onChange={(e) => props.SetFilterTaskCreator(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <span>Ревьювер</span>
            <select className='form-control-b' value={props.TasksFilters.ReviewerId} onChange={(e) => props.SetFilterTaskReviewer(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>
            <span>Статус</span>
            <select className='form-control-b' onChange={e => props.SetFilterTaskStatus(+e.target.value)} value={props.TasksFilters.Status}>
                <option value={-1}>Любой</option>
                <option value={0}>Необходимо код ревью</option>
                <option value={1}>Необходимы правки</option>
                <option value={3}>В процессе</option>
                <option value={2}>Готово</option>
            </select>
            <div>
                <Paggination
                    ElementsCount={props.CurrentProjectTasksAllCount}
                    PageNumber={props.TasksFilters.Page}
                    ElementsOnPage={tasksOnPageCount}
                    SetPageNumber={props.SetFilterTaskPage}></Paggination>
            </div>
        </div>
        <div>
            <h2>список задач</h2>
            {props.Tasks.map(x => <OneReviewTask key={x.Id}
                AuthInfo={props.AuthInfo}
                Task={x}
                Comments={x.Comments}
            ></OneReviewTask>)}

        </div>
    </div>
}



const mapStateToProps = (state: AppState, ownProps: IProjectDetailOwnProps) => {
    let res = {} as IProjectDetailStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.TasksFilters = state.CodeReviewApp.CurrentProjectTasksFilters;
    res.CurrentProjectTasksAllCount = state.CodeReviewApp.CurrentProjectTasksAllCount;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectDetailOwnProps) => {
    let res = {} as IProjectDetailDispatchToProps;

    res.SetFilterTaskCreator = (id: number) => {
        dispatch(SetFilterTaskCreatorActionCreator(id));
    };
    res.SetFilterTaskReviewer = (id: number) => {
        dispatch(SetFilterTaskReviewerActionCreator(id));
    };
    res.SetFilterTaskName = (name: string) => {
        dispatch(SetFilterTaskNameActionCreator(name));
    };
    res.SetFilterTaskPage = (num: number) => {
        dispatch(SetFilterTaskPageActionCreator(num));
    };
    res.SetFilterTaskStatus = (status: number) => {
        dispatch(SetFilterTaskStatusActionCreator(status));
    };

    res.ReloadTasks = (filter: ITaskFilter) => {
        dispatch(window.G_CodeReviewTaskController.LoadTasksRedux(filter));
    };

    // res.AddUserToProject = (user:IProjectUserDataBack) => { };
    // AddTaskToProject: (task: IProjectTaskDataBack) => void;
    res.DeleteProject = (id: number) => {
        dispatch(window.G_CodeReviewProjectController.DeleteProjectRedux(id));
    };
    // res.ChangeUser = () => { };
    // res.DeleteUser = () => { };





    // res.UpdateTask = (forAdd: IProjectTaskDataBack) => {
    //     dispatch(window.G_CodeReviewTaskController.UpdateTaskRedux(forAdd));
    // };
    // res.SetEmptyTaskComments = (taskId: number) => {
    //     dispatch(SetEmptyTaskCommentsActionCreator(taskId))
    // }
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(ProjectDetail);