/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';
import { IOneProjectInfoDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneProjectInfoDataBack';
import { IOneProjectInListDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';

import { IAuthState } from "../../../../Models/Models/AuthState";
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import { AppState } from '../../../../Models/Models/State/AppState';

import { connect } from "react-redux";


require('./CodeReviewMain.css');



interface CodeReviewMainOwnProps {
    AuthInfo: IAuthState;
}


interface ICodeReviewMainStateToProps {
    // Test: string;
    CurrentProjectId: number;
    ProjectsList: IOneProjectInListDataBack[];
    CurrentProjectUsers: IProjectUserDataBack[];
}

interface CodeReviewMainDispatchToProps {
    // ChangeTestString: (v: string) => void;
    SetCurrentProjectId: (id: number) => void;
    SetProjectsList: (lst: IOneProjectInListDataBack[]) => void;
    AddProjectList: (rec: IOneProjectInListDataBack) => void;
    RemoveProjectList: (recId: number) => void;

    SetCurrentProjectUsers: (lst: IProjectUserDataBack[]) => void;
    AddCurrentProjectUser: (rec: IProjectUserDataBack) => void;
    ChangeCurrentProjectUser: (rec: IProjectUserDataBack) => void;
    RemoveCurrentProjectUser: (rec: IProjectUserDataBack) => void;
}


interface CodeReviewMainProps extends ICodeReviewMainStateToProps, CodeReviewMainOwnProps, CodeReviewMainDispatchToProps {
}



const CodeReviewMain = (props: CodeReviewMainProps) => {

    // const [currentProjectId, setCurrentProjectId] = useState(-1);
    // const [projectsList, setProjectsList] = useState([] as IOneProjectInListDataBack[]);
    // const [currentProjectUsers, setCurrentProjectUsers] = useState([] as IProjectUserDataBack[]);


    useEffect(() => {
        // let getProjects = (error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data) {
        //         props.SetCurrentProjectId(-1);
        //         props.SetProjectsList(data);
        //     }
        // };

        window.G_CodeReviewProjectController.GetUserProjectsRedux();
    }, []);


    useEffect(() => {
        if (props.CurrentProjectId > 0) {
            // let getProjectInfo = (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => {
            //     if (error) {
            //         return;
            //     }

            //     if (data) {
            //         props.SetCurrentProjectUsers(data.Users);
            //         // setCurrentProjectTasks(data.Tasks);
            //     }
            // };

            window.G_CodeReviewProjectController.GetProjectInfoRedux(props.CurrentProjectId);
        }
    }, [props.CurrentProjectId]);


    const addNewProject = (newProjectName: string) => {
        if (!newProjectName) {
            alert('Введите название');
        }
        // let addProject = (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => {
        //     if (error) {
        //         return;
        //     }

        //     if (data) {
        //         // setCurrentProjectId(-1);
        //         props.AddProjectList(data);
        //     }
        // };

        window.G_CodeReviewProjectController.CreateNewProjectRedux(newProjectName);
    };


    // const addNewUserToProject = (user: IProjectUserDataBack) => {
    //     props.AddCurrentProjectUser(user);
    // };





    // const deleteProject = () => {
    //     props.SetCurrentProjectId(-1);
    //     props.RemoveProjectList(oldState => {
    //         let newState = [...oldState];
    //         return newState.filter(x => x.Id != currentProjectId);
    //     });
    // };

    // const changeUser = (user: IProjectUserDataBack) => {
    //     props.ChangeCurrentProjectUser(oldState => {
    //         let newState = cloneDeep(oldState);
    //         let userState = newState.find(x => x.Id === user.Id);
    //         if (userState) {
    //             userState.Email = user.Email;
    //             userState.Name = user.Name;
    //             userState.IsAdmin = user.IsAdmin;
    //             userState.Deactivated = user.Deactivated;
    //         }

    //         return newState;
    //     });
    // };

    // const deleteUser = (id: number) => {
    //     props.RemoveCurrentProjectUser(oldState => {
    //         let newState = [...oldState];
    //         return newState.filter(x => x.Id != id);
    //     });
    // }


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
                AuthInfo={props.AuthInfo}
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







const mapStateToProps = (state: AppState, ownProps: CodeReviewMainOwnProps) => {
    let res = {} as ICodeReviewMainStateToProps;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    res.CurrentProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.ProjectsList = state.CodeReviewApp.ProjectsList;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: CodeReviewMainOwnProps) => {
    let res = {} as CodeReviewMainDispatchToProps;

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(CodeReviewMain);