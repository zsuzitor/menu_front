import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { connect } from "react-redux";
import { AlertData } from '../../../../Models/Models/AlertData';
import { OneProjectInList as OneProjectInListModel } from '../../../../Models/Models/CodeReviewApp/State/OneProjectInList';

require('./ProjectsList.css');




export interface IProjectsListOwnProps {
    Projects: OneProjectInListModel[];
    CurrentProjectId: number;
}

interface IProjectsListStateToProps {
}

interface IProjectsListDispatchToProps {
    AddNewProject: (projectName: string) => void;

}


interface IProjectsListProps extends IProjectsListStateToProps, IProjectsListOwnProps, IProjectsListDispatchToProps {
}




const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');


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


    return <>

        <div className='code-review-projects-menu'>
            <div className='review-project-new-block'>
                {/* <input type="test" onChange={e => props.ChangeTestString(e.target.value)} value={props.Test}></input>
                <p>{props.Test}</p> */}
                <input className='form-input' type='text' placeholder='Название нового проекта'
                    onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
                <button className='button button-grey' onClick={() => {
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
            <hr />
            <input className='form-input' type="text" value={filterProjectName} placeholder='Фильтр'
                onChange={e => setFilterProjectName(e.target.value)} />
            {renderList()}
        </div>
    </>
}


const mapStateToProps = (state: AppState, ownProps: IProjectsListOwnProps) => {
    let res = {} as IProjectsListStateToProps;
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