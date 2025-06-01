/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';

import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import connectToStore, { CodeReviewMainProps } from './CodeReviewMainSetup';
import { useNavigate } from 'react-router-dom';
import OneReviewTaskDetail from '../OneReviewTaskDetail/OneReviewTaskDetail';



require('./CodeReviewMain.css');




const CodeReviewMain = (props: CodeReviewMainProps) => {
    const [visibleList, setVisibleList] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        props.GetUserProjects();

        return function cleanUp() {
            props.ClearCodeReviewState();
        };
    }, []);



    useEffect(() => {
        const matchProj = window.location.href.match(/proj-(\d+)/);
        if (props.ProjectsLoaded &&
            !props.ProjectsList.find(x => x.Id == props.CurrentProjectId)//выбранного проекта нет, удален?
            && matchProj//при этом в урле он есть
        ) {

            navigate("/task-management/");
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


    }, [window.location.href]);
    //

    let mainClass = ' code-review-projects-menu-main-hide';
    if (visibleList) {
        mainClass = ' code-review-projects-menu-main-visible';
    }





    return <div className='code-review-main-container'>
        <div className='preloader' id='code_review_preloader'></div>
        <div className={'code-review-projects-menu-main' + mainClass}>
            <div onClick={() => setVisibleList(v => !v)}
                className="hide-review-projects-menu-button">{visibleList ? '<' : '>'}</div>
            <ProjectsList Projects={props.ProjectsList}
                CurrentProjectId={props.CurrentProjectId} />
        </div>
        {props.CurrentTaskId && props.CurrentTaskId > 0 ?
            <OneReviewTaskDetail></OneReviewTaskDetail>
            // <></>
            :
            <div className='code-review-project-info'>
                <ProjectDetail Project={props.ProjectsList.find(x => x.Id == props.CurrentProjectId)}
                    Tasks={props.Tasks}
                // UpdateTask={updateTaskProject}
                />
            </div>
        }

    </div>
}







// and that function returns the connected, wrapper component:
export default connectToStore(CodeReviewMain);