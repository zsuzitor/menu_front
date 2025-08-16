import React, { useState, useEffect } from 'react';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { AlertData } from '../../../../Models/Entity/AlertData';

import connectToStore, { IProjectsListProps } from './ProjectsListSetup';
import { useNavigate } from 'react-router-dom';

require('./ProjectsList.css');





const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');
    const [showProjectList, setShowProjectList] = useState(false);

    const navigate = useNavigate();

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

    let currentProject = null;
    if (props.Projects && props.CurrentProjectId) {
        currentProject = props.Projects.find(x => x.Id == props.CurrentProjectId);
    }

    return <>

        <div className='code-management-projects-menu'>
            {(showProjectList || !currentProject) ? <>
                <div className='management-project-new-block'>
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
                    <button className='button button-grey' onClick={x => setShowProjectList(false)}>Скрыть</button>
                </div>
                <hr />
                <input className='form-input' type="text" value={filterProjectName} placeholder='Фильтр'
                    onChange={e => setFilterProjectName(e.target.value)} />
                {renderList()}</>
                : <>
                    <button className='button button-grey' onClick={x => setShowProjectList(true)}>Показать</button>

                    <div
                        className='selected-main-management-project'
                    >
                        <a href={'/task-management/proj-' + props.CurrentProjectId} onClick={(e) => {
                            e.preventDefault();
                            navigate("/task-management/proj-" + props.CurrentProjectId);
                        }}>{currentProject.Name}</a>
                    </div>
                </>}

        </div>
    </>
}


// and that function returns the connected, wrapper component:
export default connectToStore(ProjectsList);