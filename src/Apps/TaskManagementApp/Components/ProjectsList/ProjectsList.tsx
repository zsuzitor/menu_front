import React, { useState, useEffect } from 'react';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { AlertData } from '../../../../Models/Entity/AlertData';

import connectToStore, { IProjectsListProps } from './ProjectsListSetup';

require('./ProjectsList.css');





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


// and that function returns the connected, wrapper component:
export default connectToStore(ProjectsList);