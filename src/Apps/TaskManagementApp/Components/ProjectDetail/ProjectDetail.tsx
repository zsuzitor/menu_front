import React, { useState, useEffect } from 'react';

import OneWorkTask from '../OneWorkTask/OneWorkTask';
import cloneDeep from 'lodash/cloneDeep';
import AddTask from '../AddTask/AddTask';
import { TaskManagementLocalStorageHelper } from '../../../PlaningPoker/Models/PlaningPokerHelper';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import Paggination from '../../../../components/Body/Paggination/Paggination';
import { ITaskFilter } from '../../Models/Entity/ITaskFilter';
import ProjectUsers from '../ProjectUsers/ProjectUsers';
import connectToStore, { IProjectDetailProps } from './ProjectDetailSetup';
import EditProject from '../EditProject/EditProject';
import PopupWindow from '../../../../components/Body/PopupWindow/PopupWindow';
import { useNavigate } from 'react-router-dom';




require('./ProjectDetail.css');






const ProjectDetail = (props: IProjectDetailProps) => {
    const tasksOnPageCount = 5;

    const [loadTasksTimerId, setLoadTasksTimerId] = useState(null);
    const [showUserList, setShowUserList] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showAddNewTaskForm, setShowAddNewTaskForm] = useState(false);

    const [filterVisibilityName, setFilterVisibilityName] = useState(false);
    const [filterVisibilityCreator, setFilterVisibilityCreator] = useState(false);
    const [filterVisibilityStatus, setFilterVisibilityStatus] = useState(false);
    const [filterVisibilityReviwer, setFilterVisibilityReviwer] = useState(false);



    const navigate = useNavigate();

    useEffect(() => {

        return () => {
            props.ClearProjectState();

        };
    }, []);

    useEffect(() => {
        if (props.Project?.Id) {

            let filterSaveHelper = new TaskManagementLocalStorageHelper();
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

        let filterExecutorExist = props.ProjectUsers.some((x) => x.Id === props.TasksFilters.ExecutorId);
        if (!filterExecutorExist) {
            props.SetFilterTaskExecutor(-1);
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

        let filterSaveHelper = new TaskManagementLocalStorageHelper();
        let statusFromLocalStorage = filterSaveHelper.GetFilterStatus(props.Project.Id);
        if ((props.TasksFilters.Status + '') !== statusFromLocalStorage) {
            filterSaveHelper.SetFilterStatus(props.Project.Id, props.TasksFilters.Status + '');
            // return;
        }

        var timerId = setTimeout(() => {
            reloadTasks();
        }, 1500);

        setLoadTasksTimerId(timerId);

    }, [props.Project?.Id, props.TasksFilters.CreatorId, props.TasksFilters.ExecutorId
        , props.TasksFilters.Status, props.TasksFilters.TaskName
        , props.TasksFilters.Page, props.TasksFilters.Retrigger]);



    const reloadTasks = () => {

        let filter = {
            Name: props.TasksFilters.TaskName, CreatorId: props.TasksFilters.CreatorId
            , PageNumber: props.TasksFilters.Page, PageSize: tasksOnPageCount
            , ProjectId: props.Project.Id, ExecutorId: props.TasksFilters.ExecutorId
            , StatusId: props.TasksFilters.Status
        } as ITaskFilter;

        props.ReloadTasks(filter);
    }


    const deleteProject = () => {
        props.DeleteProject(props.Project.Id);
    };


    const clearFilters = () => {
        props.ClearFilterTask();
        setFilterVisibilityName(false);
        setFilterVisibilityCreator(false);
        setFilterVisibilityStatus(false);
        setFilterVisibilityReviwer(false);

    }




    if (!props.Project) {
        return <div className='management-project-no-project'>
            <img src={G_PathToBaseImages + 'exclamation.png'} alt='' />
            <h2>Выберите проект</h2>
        </div>
    }




    return <div className='code-management-project-info'>
        <div className='management-project-detail-main'>
            <div className='management-project-detail-main-header'>
                <h1>{props.Project.Name}</h1>
                <div className='management-project-edit-button' onClick={() => {
                    setShowEditProject(true);
                }}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'edit-1.svg'}
                        alt='Edit' title='Редактировать проект' />
                </div>
                <div className='management-project-delete-button' onClick={() => {
                    if (confirm('Удалить проект?')) {
                        deleteProject();
                    }
                }}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt='Delete' title='Удалить проект' />
                </div>
                {showEditProject ? <AdditionalWindow CloseWindow={() => setShowEditProject(false)}
                    IsHeightWindow={true}
                    Title='Редакторивание проекта'
                    InnerContent={() => <EditProject></EditProject>}></AdditionalWindow> : <></>}
                <br />
                <div className='management-project-detail-main-header-buttons'>
                    <button className='button button-grey' onClick={() => setShowUserList(e => true)}>Люди проекта</button>
                    {showUserList ? <AdditionalWindow CloseWindow={() => setShowUserList(false)}
                        IsHeightWindow={true}
                        Title='Люди проекта'
                        InnerContent={() => <ProjectUsers></ProjectUsers>}></AdditionalWindow> : <></>}

                </div>
            </div>
            <div className='management-project-description'>
                описание
            </div>
            {/* <div className='management-project-tasks-filters-block'>
            <h4 className='persent-100-width'>Фильтры</h4>

        </div> */}
            <div className='management-project-tasks'>
                <div className='tasks-header'>
                    <div><h3>Задачи</h3></div>
                    <div><button className='add-task-btn'
                        onClick={() => setShowAddNewTaskForm(true)}>
                        <span className='plus-icon'>+</span>
                        <span>Добавить задачу</span>
                    </button></div>
                    <div><PopupWindow
                        ButtonContent={<button className='add-filter-btn'>
                            <span className='plus-icon'>+</span>
                            <span>Добавить фильтр</span>
                        </button>
                        }
                        PopupContent={<div className='tasks-filters-window'>
                            <div className='add-one-filter' onClick={() => setFilterVisibilityName(true)}>Название</div>
                            <div className='add-one-filter' onClick={() => setFilterVisibilityCreator(true)}>Создатель</div>
                            <div className='add-one-filter' onClick={() => setFilterVisibilityReviwer(true)}>Ревьювер</div>
                            <div className='add-one-filter' onClick={() => setFilterVisibilityStatus(true)}>Статус</div>
                        </div>}
                    ></PopupWindow></div>

                    {((filterVisibilityName
                        || filterVisibilityCreator
                        || filterVisibilityReviwer
                        || filterVisibilityStatus)
                        || (props.TasksFilters.CreatorId != -1
                            || props.TasksFilters.ExecutorId != -1
                            || props.TasksFilters.Status != -1
                            || props.TasksFilters.TaskName != ''
                            || props.TasksFilters.Page != 1))
                        &&
                        <div><button className='del-filter-btn'
                            onClick={() => clearFilters()}>
                            <span className='cross-icon'>×</span>
                            <span>Очистить фильтры</span>
                        </button></div>}
                </div>
                {showAddNewTaskForm ? <AdditionalWindow CloseWindow={() => setShowAddNewTaskForm(false)}
                    IsHeightWindow={false}
                    Title='Добавление задачи'
                    InnerContent={() => <AddTask
                        ProjectId={props.Project.Id}
                        ProjectUsers={props.ProjectUsers.filter(us => !us.Deactivated)}
                    ></AddTask>}></AdditionalWindow> : <></>}


                <div className='management-project-tasks-filters-buttons'>
                    <div className='management-project-tasks-filters-block-flex'>

                        {filterVisibilityName && <div className='filter-container'>
                            <div className='filter-tag'>
                                <span className='filter-name'>Название:</span>
                                <input type='text' className='filter-input'
                                    placeholder='Введите название'
                                    value={props.TasksFilters.TaskName}
                                    onChange={e => props.SetFilterTaskName(e.target.value)}></input>
                                <button className='remove-filter' title='Удалить фильтр'
                                    onClick={() => {
                                        props.SetFilterTaskName('');
                                        setFilterVisibilityName(false);
                                    }}>×</button>
                            </div>
                        </div>}
                        {filterVisibilityCreator && <div className='filter-container'>
                            <div className='filter-tag'>
                                <span className='filter-name'>Создатель:</span>
                                <select className='filter-input' value={props.TasksFilters.CreatorId}
                                    onChange={(e) => props.SetFilterTaskCreator(+e.target.value)}>
                                    <option value={-1}>Не выбрано</option>
                                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                                </select>
                                <button className='remove-filter' title='Удалить фильтр'
                                    onClick={() => {
                                        props.SetFilterTaskCreator(-1);
                                        setFilterVisibilityCreator(false);
                                    }}>×</button>
                            </div>
                        </div>}
                        {filterVisibilityReviwer && <div className='filter-tag'>
                            <span className='filter-name'>Ревьювер:</span>
                            <select className='filter-input' value={props.TasksFilters.ExecutorId}
                                onChange={(e) => props.SetFilterTaskExecutor(+e.target.value)}>
                                <option value={-1}>Не выбрано</option>
                                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                            </select>
                            <button className='remove-filter' title='Удалить фильтр'
                                onClick={() => {
                                    props.SetFilterTaskExecutor(-1);
                                    setFilterVisibilityReviwer(false);
                                }}>×</button>
                        </div>}

                        {filterVisibilityStatus && <div className='filter-tag'>
                            <span className='filter-name'>Статус:</span>

                            <select className='filter-input'
                                onChange={e => props.SetFilterTaskStatus(+e.target.value)}
                                value={props.TasksFilters.Status}>
                                <option value={-1}>Любой</option>
                                {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
                            </select>

                            <button className='remove-filter' title='Удалить фильтр'
                                onClick={() => {
                                    props.SetFilterTaskStatus(-1);
                                    setFilterVisibilityStatus(false);
                                }}>×</button>
                        </div>}
                    </div>

                    {/* <button className='button button-grey' onClick={() => clearFilters()}>Очистить</button> */}
                </div>
                {props.Tasks.length
                    ? props.Tasks.map(x =>
                        <OneWorkTask key={x.Id}
                            Task={x}
                            Comments={x.Comments}
                            CurrentProjectId={props.Project.Id}
                        ></OneWorkTask>)
                    : <div className='management-project-tasks-no-tasks'>
                        <img src={G_PathToBaseImages + 'exclamation.png'} alt='' />
                        <h2>Задачи не найдены!</h2>
                    </div>
                }
                <div>
                    <div className='project-paggination-block'>
                        {props.CurrentProjectTasksAllCount > tasksOnPageCount && <Paggination
                            ElementsCount={props.CurrentProjectTasksAllCount}
                            PageNumber={props.TasksFilters.Page}
                            ElementsOnPage={tasksOnPageCount}
                            SetPageNumber={props.SetFilterTaskPage}></Paggination>}

                    </div>
                </div>
            </div>
        </div>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(ProjectDetail);