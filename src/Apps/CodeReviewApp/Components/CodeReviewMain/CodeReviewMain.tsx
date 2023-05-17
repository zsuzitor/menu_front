/// <reference path="../../../../../typings/globals.d.ts" />

import React, { useState, useEffect } from 'react';

import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ProjectsList from '../ProjectsList/ProjectsList';
import cloneDeep from 'lodash/cloneDeep';
import { AppState } from '../../../../Models/Entity/State/AppState';

import { connect } from "react-redux";
import { ClearCodeReviewStateActionCreator } from '../../Models/Actions/Actions';
import { OneTask } from '../../Models/Entity/State/OneTask';
import { ProjectUser } from '../../Models/Entity/State/ProjectUser';
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';


require('./CodeReviewMain.css');



interface ICodeReviewMainOwnProps {
}


interface ICodeReviewMainStateToProps {
    // Test: string;
    CurrentProjectId: number;
    ProjectsList: OneProjectInListModel[];
    CurrentProjectUsers: ProjectUser[];
    Tasks: OneTask[];
}

interface ICodeReviewMainDispatchToProps {
    SetCurrentProjectId: (id: number) => void;
    GetUserProjects: () => void;
    GetProjectInfo: (id: number) => void;
    ClearCodeReviewState: () => void;
}


interface CodeReviewMainProps extends ICodeReviewMainStateToProps, ICodeReviewMainOwnProps, ICodeReviewMainDispatchToProps {
}



const CodeReviewMain = (props: CodeReviewMainProps) => {
    const [visibleList, setVisibleList] = useState(true);

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

    res.ClearCodeReviewState = () => {
        dispatch(ClearCodeReviewStateActionCreator());
    }

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(CodeReviewMain);