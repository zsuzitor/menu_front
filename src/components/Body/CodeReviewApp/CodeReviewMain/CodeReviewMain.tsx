/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';

import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import { AppState } from '../../../../Models/Models/State/AppState';

import { connect } from "react-redux";
import { OneTask } from '../../../../Models/Models/CodeReviewApp/State/OneTask';
import { OneProjectInList } from '../../../../Models/Models/CodeReviewApp/State/OneProjectInList';
import { ProjectUser } from '../../../../Models/Models/CodeReviewApp/State/ProjectUser';


require('./CodeReviewMain.css');



interface ICodeReviewMainOwnProps {
}


interface ICodeReviewMainStateToProps {
    // Test: string;
    CurrentProjectId: number;
    ProjectsList: OneProjectInList[];
    CurrentProjectUsers: ProjectUser[];
    Tasks: OneTask[];
}

interface ICodeReviewMainDispatchToProps {
    SetCurrentProjectId: (id: number) => void;
    GetUserProjects: () => void;
    GetProjectInfo: (id: number) => void;
}


interface CodeReviewMainProps extends ICodeReviewMainStateToProps, ICodeReviewMainOwnProps, ICodeReviewMainDispatchToProps {
}



const CodeReviewMain = (props: CodeReviewMainProps) => {

    useEffect(() => {
        props.GetUserProjects();
    }, []);


    useEffect(() => {
        if (props.CurrentProjectId > 0) {

            props.GetProjectInfo(props.CurrentProjectId);
        }
    }, [props.CurrentProjectId]);



    return <div className='code-review-main-container'>
        <div className='preloader' id='code_review_preloader'></div>
        <div className='code-review-projects-menu-main'>

            <ProjectsList Projects={props.ProjectsList}
                CurrentProjectId={props.CurrentProjectId}
            ></ProjectsList>
        </div>
        <div className='code-review-project-info'>
            <ProjectDetail Project={props.ProjectsList.find(x => x.Id == props.CurrentProjectId)}
                
                Tasks={props.Tasks}
            // UpdateTask={updateTaskProject}
            ></ProjectDetail>
        </div>
    </div>
}







const mapStateToProps = (state: AppState, ownProps: ICodeReviewMainOwnProps) => {
    let res = {} as ICodeReviewMainStateToProps;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    res.CurrentProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.ProjectsList = state.CodeReviewApp.ProjectsList;
    res.Tasks = state.CodeReviewApp.CurrentProjectTasks;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICodeReviewMainOwnProps) => {
    let res = {} as ICodeReviewMainDispatchToProps;
    res.GetUserProjects = () => {
        dispatch(window.G_CodeReviewProjectController.GetUserProjectsRedux());
    };

    res.GetProjectInfo = (id: number) => {
        dispatch(window.G_CodeReviewProjectController.GetProjectInfoRedux(id));
    }
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(CodeReviewMain);