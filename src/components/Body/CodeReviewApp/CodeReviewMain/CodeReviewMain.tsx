/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';
import { IOneProjectInfoDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInfoDataBack';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectTaskDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';

import { IAuthState } from "../../../_ComponentsLink/Models/AuthState";
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';



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
                    // setCurrentProjectTasks(data.Tasks);
                }
            };

            window.G_CodeReviewController.GetProjectInfo(currentProjectId, getProjectInfo);
        }
    }, [currentProjectId]);


    const addNewProject = (newProjectName: string) => {
        if (!newProjectName) {
            alert('Введите название');
        }
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





    const deleteProject = () => {
        setCurrentProjectId(-1);
        setProjectsList(oldState => {
            let newState = [...oldState];
            return newState.filter(x => x.Id != currentProjectId);
        });
    };

    const changeUser = (user: IProjectUserDataBack) => {
        setCurrentProjectUsers(oldState => {
            let newState = cloneDeep(oldState);
            let userState = newState.find(x => x.Id === user.Id);
            userState.Email = user.Email;
            userState.Name = user.Name;
            return newState;
        });
    };

    const deleteUser = (id: number) => {
        setCurrentProjectUsers(oldState => {
            let newState = [...oldState];
            return newState.filter(x => x.Id != id);
        });
    }


    return <div className='code-review-main-container'>
        <div className='code-review-projects-menu-main'>
            <ProjectsList Projects={projectsList}
                AddNewProject={addNewProject}
                SetCurrentProject={setCurrentProjectId}
                CurrentProjectId={currentProjectId}
            ></ProjectsList>
        </div>
        <div className='code-review-project-info'>
            <ProjectDetail Project={projectsList.find(x => x.Id == currentProjectId)}
                ProjectUsers={currentProjectUsers}
                AddUserToProject={addNewUserToProject}
                // AddTaskToProject={addTaskToProject}
                // ProjectTasks={currentProjectTasks}
                DeleteProject={deleteProject}
                ChangeUser={changeUser}
                DeleteUser={deleteUser}
            // UpdateTask={updateTaskProject}
            ></ProjectDetail>
        </div>
    </div>
}




export default CodeReviewMain;