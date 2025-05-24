/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';

import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import connectToStore, { CodeReviewMainProps } from './CodeReviewMainSetup';
import { useNavigate } from 'react-router-dom';



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
        if (props.CurrentProjectId > 0) {

            props.GetProjectInfo(props.CurrentProjectId);
        }
    }, [props.CurrentProjectId]);


    useEffect(() => {
        if (props.ProjectsList.length > 0//страница загружена уже, список проектов есть
        ) {
            if (props.CurrentProjectId && props.CurrentProjectId > 0) {

                navigate("/code-review/proj-" + props.CurrentProjectId);
            }
            else {
                //никакой проект не выбран
                const match = window.location.href.match(/proj-(\d+)/);
                if (match) {
                    const projId = match[1];
                    const projIdInt = parseInt(match[1], 10);
                    props.SetCurrentProject(projIdInt);
                    // console.log("SetCurrentProject" + projIdInt);
                }
            }

        }

    }, [props.ProjectsList.length, props.CurrentProjectId]);

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
        <div className='code-review-project-info'>
            <ProjectDetail Project={props.ProjectsList.find(x => x.Id == props.CurrentProjectId)}
                Tasks={props.Tasks}
            // UpdateTask={updateTaskProject}
            />
        </div>
    </div>
}







// and that function returns the connected, wrapper component:
export default connectToStore(CodeReviewMain);