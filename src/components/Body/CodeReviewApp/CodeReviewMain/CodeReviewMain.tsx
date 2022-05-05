/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';
import { IOneProjectInfoDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInfoDataBack';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectTaskDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
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
    const [currentProjectUsers, setCurrentProjectUsers] = useState([] as IProjectUserDataBack[]);
    const [currentProjectTasks, setCurrentProjectTasks] = useState([] as IProjectTaskDataBack[]);


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


    useEffect(() => {
        if (currentProjectId > 0) {
            let getProjectInfo = (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => {
                if (error) {
                    //TODO выбить из комнаты?
                    alert("todo что то пошло не так лучше обновить страницу");
                    return;
                }

                if (data) {
                    setCurrentProjectUsers(data.Users);
                    setCurrentProjectTasks(data.Tasks);
                }
            };

            window.G_CodeReviewController.GetProjectInfo(currentProjectId, getProjectInfo);
        }
    }, [currentProjectId]);


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


    const addNewUserToProject = (user: IProjectUserDataBack) => {
        setCurrentProjectUsers(oldState => {
            return [...oldState, user];
        });
    };

    const addTaskToProject = (task: IProjectTaskDataBack) => {
        setCurrentProjectTasks(oldState => {
            return [...oldState, task];
        });
    };





    return <div className='code-review-main-container'>
        <div className='code-review-projects-menu'>
            <ProjectsList Projects={projectsList}
                AddNewProject={addNewProject}
                SetCurrentProject={setCurrentProjectId}
                CurrentProjectId={currentProjectId}></ProjectsList>
        </div>
        <div className='code-review-project-info'>
            <ProjectDetail Project={projectsList.find(x => x.Id == currentProjectId)}
                ProjectUsers={currentProjectUsers}
                AddUserToProject={addNewUserToProject}
                AddTaskToProject={addTaskToProject}
                ProjectTasks={currentProjectTasks}
            ></ProjectDetail>
        </div>
    </div>
}




export default CodeReviewMain;