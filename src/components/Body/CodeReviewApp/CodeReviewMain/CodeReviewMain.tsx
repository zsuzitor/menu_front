/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';

import { IAuthState } from "../../../_ComponentsLink/Models/AuthState";
import ProjectDetail from '../ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';



require('./CodeReviewMain.css');



class CodeReviewMainProps {
    AuthInfo: IAuthState;
}

// class CodeReviewMainState{

// }



const CodeReviewMain = (props: CodeReviewMainProps) => {

    const [currentProjectId, setCurrentProjectId] = useState(-1);
    const [projectsList, setProjectsList] = useState([] as IOneProjectInListDataBack[]);


    useEffect(() => {
        let getProjects = (error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setCurrentProjectId(-1);
                setProjectsList(data);
            }
        };

        window.G_CodeReviewController.GetUserProjects(getProjects);
    }, []);


    const addNewProject = (newProjectName: string) => {
        let addProject = (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                // setCurrentProjectId(-1);
                setProjectsList((oldState) => {
                    let newState = [...oldState, data];
                    return newState;
                });
            }
        };

        window.G_CodeReviewController.CreateNewProject(newProjectName, addProject);
    };



    return <div className='code-review-main-container'>
        <div className='code-review-projects-menu'>
            <ProjectsList Projects={projectsList}
                AddNewProject={addNewProject}
                SetCurrentProject={setCurrentProjectId}
                CurrentProjectId={currentProjectId}></ProjectsList>
        </div>
        <div className='code-review-project-info'>
            выбранный проект:
            <ProjectDetail Project={projectsList.find(x => x.Id == currentProjectId)}></ProjectDetail>
        </div>
    </div>
}




export default CodeReviewMain;