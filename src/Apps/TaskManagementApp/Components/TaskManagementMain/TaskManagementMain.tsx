/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';

import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import connectToStore, { TaskManagementMainProps } from './TaskManagementMainSetup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import OneWorkTaskDetail from '../OneWorkTaskDetail/OneWorkTaskDetail';
import { TaskManagementLabelsRoute, TaskManagementPreloader, TaskManagementPresetsRoute, TaskManagementProjectRoute, TaskManagementSprintRoute, TaskManagementSprintsRoute, TaskManagementTaskRoute, TaskManagementTempoRoute, TaskManagementTimeLogRoute, TaskManagementUserRoute } from '../../Models/Consts';
import ProjectTimePage from '../ProjectTimePage/ProjectTimePage';
import PersonTimePage from '../PersonTimePage/PersonTimePage';
import TempoPage from '../TempoPage/TempoPage';
import Sprints from '../Sprints/Sprints';
import Sprint from '../Sprint/Sprint';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import Labels from '../Labels/Labels';
import Presets from '../Presets/Presets';



require('./TaskManagementMain.css');




const TaskManagementMain = (props: TaskManagementMainProps) => {
    const [visibleList, setVisibleList] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        props.GetUserProjects();

        return function cleanUp() {
            props.ClearClearTaskManagementStateState();
        };
    }, []);



    useEffect(() => {
        const matchProj = window.location.href.match(/proj-(\d+)/);
        if (props.ProjectsLoaded &&
            !props.ProjectsList.find(x => x.Id == props.CurrentProjectId)//выбранного проекта нет, удален?
            && matchProj//при этом в урле он есть
        ) {

            const url = new RouteBuilder().AppUrl();
            navigate(url);
        }

    }, [props.ProjectsList.length, props.ProjectsLoaded]);


    useEffect(() => {
        if (props.CurrentProjectId && props.CurrentProjectId > 0) {

            props.GetProjectInfo(props.CurrentProjectId);
        }
    }, [props.CurrentProjectId]);

    useEffect(() => {
        if (props.CurrentTaskId && props.CurrentTaskId > 0) {
            props.GetTaskInfo(props.CurrentTaskId);
        }
    }, [props.CurrentTaskId]);

    // useEffect(() => {
    //     if (props.ProjectsList.length > 0//страница загружена уже, список проектов есть
    //     ) {
    //         if (props.CurrentProjectId && props.CurrentProjectId > 0) {
    //             if (props.CurrentTaskId && props.CurrentTaskId > 0) {

    //                 navigate("/code-review/proj-" + props.CurrentProjectId + '/task-' + props.CurrentTaskId);
    //             }
    //             else {
    //                 navigate("/code-review/proj-" + props.CurrentProjectId);
    //             }
    //         }
    //         else {
    //             //никакой проект не выбран
    //             const matchProj = window.location.href.match(/proj-(\d+)/);
    //             if (matchProj) {
    //                 const projIdInt = parseInt(matchProj[1], 10);
    //                 props.SetCurrentProject(projIdInt);
    //                 // console.log("SetCurrentProject" + projIdInt);
    //             }

    //             const matchTask = window.location.href.match(/task-(\d+)/);
    //             if (matchTask) {
    //                 const taskIdInt = parseInt(matchTask[1], 10);
    //                 props.SetCurrentTask(taskIdInt);
    //                 // console.log("SetCurrentProject" + projIdInt);
    //             }
    //         }

    //     }

    // }, [props.ProjectsList.length, props.CurrentProjectId, props.CurrentTaskId]);

    useEffect(() => {

        //   const { projectId, taskId } = useParams();
        const matchProj = window.location.href.match(/proj-(\d+)/);
        if (matchProj) {
            const projIdInt = parseInt(matchProj[1], 10);
            props.SetCurrentProject(projIdInt);
            // console.log("SetCurrentProject-" + projIdInt);
        }
        else {

            props.SetCurrentProject(-1);
        }

        const matchTask = window.location.href.match(/task-(\d+)/);
        if (matchTask) {
            const taskIdInt = parseInt(matchTask[1], 10);
            props.SetCurrentTask(taskIdInt);
            // console.log("SetCurrentProject" + projIdInt);
        }
        else {

            props.SetCurrentTask(-1);
        }

        const matchSprint = window.location.href.match(/sprint-(\d+)/);
        if (matchSprint) {
            const sprintIdInt = parseInt(matchSprint[1], 10);
            props.SetCurrentSprint(sprintIdInt);
            // console.log("SetCurrentProject" + projIdInt);
        }
        else {

            props.SetCurrentSprint(-1);
        }

        const matchUser = window.location.href.match(/user-(\d+)/);
        if (matchUser) {
            const userIdInt = parseInt(matchUser[1], 10);
            props.SetCurrentUser(userIdInt);
            // console.log("SetCurrentProject" + projIdInt);
        }
        else {

            props.SetCurrentUser(-1);
        }


    }, [window.location.href]);
    //

    let mainClass = ' code-management-projects-menu-main-hide';
    if (visibleList) {
        mainClass = ' code-management-projects-menu-main-visible';
    }



    const timeLogUrl = new RouteBuilder().TimeLogUrl(props.CurrentProjectId);
    const tempoUrl = new RouteBuilder().TempoUrl(props.CurrentProjectId);
    const sprintsUrl = new RouteBuilder().SprintsUrl(props.CurrentProjectId);
    const labelsUrl = new RouteBuilder().LabelsUrl(props.CurrentProjectId);

    return <div className='task-management-main-container'>
        <div className='preloader' id={TaskManagementPreloader}></div>
        <div className={'code-management-projects-menu-main' + mainClass}>
            <div onClick={() => setVisibleList(v => !v)}
                className="hide-management-projects-menu-button">{visibleList ? '<' : '>'}</div>
            <div className='menu-main-inner'>
                <ProjectsList Projects={props.ProjectsList}
                    CurrentProjectId={props.CurrentProjectId} />

                {props.CurrentProjectId > 0 && <div className='links'
                >
                    <a href={timeLogUrl} onClick={(e) => {
                        e.preventDefault();
                        navigate(timeLogUrl);
                    }}>Работа</a>
                    <a href={tempoUrl} onClick={(e) => {
                        e.preventDefault();
                        navigate(tempoUrl);
                    }}>Темпо</a>
                    <a href={sprintsUrl} onClick={(e) => {
                        e.preventDefault();
                        navigate(sprintsUrl);
                    }}>Спринты</a>
                    <a href={labelsUrl} onClick={(e) => {
                        e.preventDefault();
                        navigate(labelsUrl);
                    }}>Лейблы</a>
                </div>}
            </div>
        </div>
        <Routes>


            <Route path={`${TaskManagementProjectRoute}:projectId`} element={<ProjectDetail
                Project={props.ProjectsList.find(x => x.Id == props.CurrentProjectId)}
                Tasks={props.Tasks} />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementTaskRoute}:taskId`} element={<OneWorkTaskDetail />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementTimeLogRoute}`} element={<ProjectTimePage />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementUserRoute}:userId/${TaskManagementTimeLogRoute}`} element={<PersonTimePage />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementTempoRoute}`} element={<TempoPage />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementSprintsRoute}`} element={<Sprints />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementLabelsRoute}`} element={<Labels />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementSprintRoute}:sprintId`} element={<Sprint />} />
            <Route path={`${TaskManagementProjectRoute}:projectId/${TaskManagementPresetsRoute}`} element={<Presets />} />
        </Routes>

        {/* {props.CurrentTaskId && props.CurrentTaskId > 0 ?
            <OneWorkTaskDetail></OneWorkTaskDetail>
            // <></>
            :
            <div className='code-management-project-info'>
                <ProjectDetail Project={props.ProjectsList.find(x => x.Id == props.CurrentProjectId)}
                    Tasks={props.Tasks}
                // UpdateTask={updateTaskProject}
                />
            </div>
        } */}

    </div>
}







// and that function returns the connected, wrapper component:
export default connectToStore(TaskManagementMain);