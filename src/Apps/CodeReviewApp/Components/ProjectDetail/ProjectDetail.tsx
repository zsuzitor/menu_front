import React, { useState, useEffect } from 'react';

import OneReviewTask from '../OneReviewTask/OneReviewTask';
import cloneDeep from 'lodash/cloneDeep';
import AddTask from '../AddTask/AddTask';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { CodeReviewLocalStorageHelper } from '../../../PlaningPoker/Models/PlaningPokerHelper';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import Paggination from '../../../../components/Body/Paggination/Paggination';
import { ITaskFilter } from '../../Models/Entity/ITaskFilter';
import { OneTask } from '../../Models/Entity/State/OneTask';
import { ProjectUser } from '../../Models/Entity/State/ProjectUser';
import { TasksFilter } from '../../Models/Entity/State/TasksFilter';
import ProjectUsers from '../ProjectUsers/ProjectUsers';
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';
import { SetFilterTaskCreatorActionCreator, SetFilterTaskReviewerActionCreator, SetFilterTaskNameActionCreator, SetFilterTaskPageActionCreator, SetFilterTaskStatusActionCreator, SetFilterTaskActionCreator } from '../../Models/Actions/TaskActions';



require('./ProjectDetail.css');



interface IProjectDetailOwnProps {
    Project: OneProjectInListModel;
    Tasks: OneTask[];
}


interface IProjectDetailStateToProps {
    ProjectUsers: ProjectUser[];
    TasksFilters: TasksFilter;

    CurrentProjectTasksAllCount: number;
}

interface IProjectDetailDispatchToProps {
    SetFilterTaskCreator: (id: number) => void;
    SetFilterTaskReviewer: (id: number) => void;
    SetFilterTaskName: (name: string) => void;
    SetFilterTaskPage: (num: number) => void;
    SetFilterTaskStatus: (status: number) => void;
    ClearFilterTask: () => void;

    ReloadTasks: (filters: ITaskFilter) => void;

    DeleteProject: (id: number) => void;
}

interface IProjectDetailProps extends IProjectDetailStateToProps, IProjectDetailOwnProps, IProjectDetailDispatchToProps {
}



const ProjectDetail = (props: IProjectDetailProps) => {
    const tasksOnPageCount = 5;

    const [loadTasksTimerId, setLoadTasksTimerId] = useState(null);
    const [showUserList, setShowUserList] = useState(false);
    const [showAddNewTaskForm, setShowAddNewTaskForm] = useState(false);


    useEffect(() => {
        if (props.Project?.Id) {
            let filterSaveHelper = new CodeReviewLocalStorageHelper();
            let statusFromLocalStorage = filterSaveHelper.GetFilterStatus(props.Project.Id);
            if (!statusFromLocalStorage && statusFromLocalStorage !== '0') {
                filterSaveHelper.SetFilterStatus(props.Project.Id, props.TasksFilters.Status + '');
                statusFromLocalStorage = filterSaveHelper.GetFilterStatus(props.Project.Id);
            }

            if ((props.TasksFilters.Status + '') !== statusFromLocalStorage) {
                props.SetFilterTaskStatus(+statusFromLocalStorage);
            }
        }

    }, [props.Project?.Id]);


    useEffect(() => {

        let filterCreatorExist = props.ProjectUsers.some((x) => x.Id === props.TasksFilters.CreatorId);
        if (!filterCreatorExist) {
            props.SetFilterTaskCreator(-1);
        }

        let filterReviewerExist = props.ProjectUsers.some((x) => x.Id === props.TasksFilters.ReviewerId);
        if (!filterReviewerExist) {
            props.SetFilterTaskReviewer(-1);
        }

    }, [props.ProjectUsers.length]);


    useEffect(() => {
        if (!props.Project?.Id) {
            return;
        }
        //todo тут нужно как то с setTimeout поиграть что бы не тригерить апи на каждый введенный сомвол
        if (loadTasksTimerId) {
            clearTimeout(loadTasksTimerId);
        }

        let filterSaveHelper = new CodeReviewLocalStorageHelper();
        let statusFromLocalStorage = filterSaveHelper.GetFilterStatus(props.Project.Id);
        if ((props.TasksFilters.Status + '') !== statusFromLocalStorage) {
            filterSaveHelper.SetFilterStatus(props.Project.Id, props.TasksFilters.Status + '');
            // return;
        }

        var timerId = setTimeout(() => {
            reloadTasks();
        }, 1500);

        setLoadTasksTimerId(timerId);

    }, [props.Project?.Id, props.TasksFilters.CreatorId, props.TasksFilters.ReviewerId
        , props.TasksFilters.Status, props.TasksFilters.TaskName, props.TasksFilters.Page, props.TasksFilters.Retrigger]);



    const reloadTasks = () => {

        let filter = {
            Name: props.TasksFilters.TaskName, CreatorId: props.TasksFilters.CreatorId
            , PageNumber: props.TasksFilters.Page, PageSize: tasksOnPageCount
            , ProjectId: props.Project.Id, ReviewerId: props.TasksFilters.ReviewerId
            , Status: props.TasksFilters.Status
        } as ITaskFilter;

        props.ReloadTasks(filter);
    }


    const deleteProject = () => {
        props.DeleteProject(props.Project.Id);
    };


    const clearFilters = () => {
        props.ClearFilterTask();
    }


    if (!props.Project) {
        return <div className="review-project-no-project">
            <img src={G_PathToBaseImages + 'exclamation.png'} alt="" />
            <h2>Выберите проект</h2>
        </div>
    }




    return <div className='review-project-detail-main'>
        <div className='review-project-detail-main-header'>
            <h1>{props.Project.Name}</h1>
            <div className='review-project-delete-button' onClick={() => {
                if (confirm('Удалить проект?')) {
                    deleteProject();
                }
            }}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='Удалить проект' />
            </div>
            <br />
            <div className="review-project-detail-main-header-buttons">
                <button className='button button-grey' onClick={() => setShowUserList(e => true)}>Люди проекта</button>
                {showUserList ? <AdditionalWindow CloseWindow={() => setShowUserList(false)}
                                                  IsHeightWindow={true}
                                                  Title='Люди проекта'
                                                  InnerContent={() => <ProjectUsers></ProjectUsers>}></AdditionalWindow> : <></>}
                <button className='button button-blue' onClick={() => setShowAddNewTaskForm(true)}>Добавить задачу</button>
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
            <h4 className='persent-100-width'>Фильтры</h4>
            <div className='review-project-tasks-filters-block-flex'>
                <input className='form-input' type='text' value={props.TasksFilters.TaskName}
                    onChange={e => props.SetFilterTaskName(e.target.value)} placeholder='Название'></input>
                <div>
                    <span>Создатель</span>
                    <select className='form-select' value={props.TasksFilters.CreatorId} onChange={(e) => props.SetFilterTaskCreator(+e.target.value)}>
                        <option value={-1}>Не выбрано</option>
                        {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                    </select>
                </div>
                <div>
                    <span>Ревьювер</span>
                    <select className='form-select' value={props.TasksFilters.ReviewerId} onChange={(e) => props.SetFilterTaskReviewer(+e.target.value)}>
                        <option value={-1}>Не выбрано</option>
                        {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                    </select>
                </div>
                <div>
                    <span>Статус</span>
                    <select className='form-select' onChange={e => props.SetFilterTaskStatus(+e.target.value)} value={props.TasksFilters.Status}>
                        <option value={-1}>Любой</option>
                        <option value={0}>Необходимо код ревью</option>
                        <option value={1}>Необходимы правки</option>
                        <option value={3}>В процессе</option>
                        <option value={2}>Готово</option>
                    </select>
                </div>
            </div>
            <div className="review-project-tasks-filters-buttons">
                <Paggination
                    ElementsCount={props.CurrentProjectTasksAllCount}
                    PageNumber={props.TasksFilters.Page}
                    ElementsOnPage={tasksOnPageCount}
                    SetPageNumber={props.SetFilterTaskPage}></Paggination>
                <button className='button button-grey' onClick={() => clearFilters()}>Очистить</button>
            </div>
        </div>
        <div className="review-project-tasks">
            <h3>Задачи</h3>
            {props.Tasks.length
                ? props.Tasks.map(x =>
                    <OneReviewTask key={x.Id}
                        Task={x}
                        Comments={x.Comments}
                    ></OneReviewTask>)
                : <div className="review-project-tasks-no-tasks">
                    <img src={G_PathToBaseImages + 'exclamation.png'} alt="" />
                    <h2>Задачи не найдены!</h2>
                </div>
            }
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

    res.DeleteProject = (id: number) => {
        dispatch(window.G_CodeReviewProjectController.DeleteProjectRedux(id));
    };

    res.ClearFilterTask = () => {
        dispatch(SetFilterTaskActionCreator(new TasksFilter()));
    }

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(ProjectDetail);