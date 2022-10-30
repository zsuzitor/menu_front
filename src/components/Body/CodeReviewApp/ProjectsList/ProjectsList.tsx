import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { AppState } from '../../../../Models/Models/State/AppState';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { connect } from "react-redux";
import { SetCurrentProjectIdActionCreator } from '../../../../Models/Actions/CodeReviewApp/ProjectActions';
import { AlertData } from '../../../../Models/Models/AlertData';


require('./ProjectsList.css');




export interface IProjectsListOwnProps {
    Projects: IOneProjectInListDataBack[];//todo временно так
    CurrentProjectId: number;
    // ChangeListVisibility: () => void;
}

interface IProjectsListStateToProps {
    // Test: string;
}

interface IProjectsListDispatchToProps {
    // ChangeTestString: (v: string) => void;
    AddNewProject: (projectName: string) => void;

}


interface IProjectsListProps extends IProjectsListStateToProps, IProjectsListOwnProps, IProjectsListDispatchToProps {
}




const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');
    const [visibleList, setVisibleList] = useState(true);


    const renderList = () => {
        if (props.Projects.length === 0) {
            return <div>нет проектов</div>
        }

        return props.Projects
            .filter(x => filterProjectName ? x.Name.indexOf(filterProjectName) >= 0 : true)
            .map(x => {
                return <OneProjectInList Project={x} key={x.Id}
                    CurrentProject={props.CurrentProjectId === x.Id}
                ></OneProjectInList>
            });
    }

    let mainListClass = ' code-review-projects-menu-hide';
    if (visibleList) {
        mainListClass = ' code-review-projects-menu-visible';
    }


    return <><div onClick={() => setVisibleList(v => !v)}
        className="hide-review-projects-list-button">{visibleList ? '<' : '>'}</div>
        <div className={'code-review-projects-menu' + mainListClass}>
            <div className='review-project-new-block'>
                {/* <input type="test" onChange={e => props.ChangeTestString(e.target.value)} value={props.Test}></input>
                <p>{props.Test}</p> */}
                <input className='form-control-b' type='text' placeholder='название нового проекта'
                    onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
                <button className='btn-b btn-border' onClick={() => {
                    if (!newProjectName) {
                        let alertFactory = new AlertData();
                        let alert = alertFactory.GetDefaultError("Введите название проекта");
                        window.G_AddAbsoluteAlertToState(alert);
                        return;
                    }
                    props.AddNewProject(newProjectName);
                    setNewProjectName('');
                }}>Создать проект</button>
            </div>
            <div>
                <input className='form-control-b' type="text" value={filterProjectName} placeholder='фильтр'
                    onChange={e => setFilterProjectName(e.target.value)} />
            </div>
            {renderList()}
        </div>
    </>
}


const mapStateToProps = (state: AppState, ownProps: IProjectsListOwnProps) => {
    let res = {} as IProjectsListStateToProps;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectsListOwnProps) => {
    let res = {} as IProjectsListDispatchToProps;
    res.AddNewProject = (projectName: string) => {
        dispatch(window.G_CodeReviewProjectController.CreateNewProjectRedux(projectName));
    };

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(ProjectsList);